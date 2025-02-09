import { useLiveQuery } from "dexie-react-hooks";
import { useRef } from "react";
import { Card_Schema } from "src/database/schemas/card.schema";
import { useApi } from "src/hooks/useApi";
import { CardDraft } from "src/hooks/useCardDraftState";

type CardDraggerAreaPosition = "up" | "down";

export function DropAreas(props: { card: Card_Schema; cardDraft: CardDraft }) {
  const db = useApi();
  const overListCards = useLiveQuery(
    () => db.getCardByListId(props.card.listId),
    [db, props.card.listId],
  );
  const { cardDraft } = props;
  const prevY = useRef(0);
  const prevMove = useRef<"up" | "down">("up");
  if (!cardDraft.card) return null;
  if (cardDraft.card.id === props.card.id) return null;
  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const yDiff = e.clientY - prevY.current;
    prevY.current = e.clientY;
    const move = yDiff === 0 ? prevMove.current : yDiff > 0 ? "down" : "up";
    prevMove.current = move;
    if (!cardDraft.card) return;
    const position = getNewPosition({
      overCard: props.card,
      overListCards: overListCards ?? [],
      area: move,
    });
    cardDraft.update({
      position,
      listId: props.card.listId,
    });
  };
  return (
    <div
      className="absolute top-0 right-0 bottom-0 left-0 flex flex-1 flex-col"
      onDragOver={onDragOver}
    />
  );
}

function getNewPosition(props: {
  overCard: Card_Schema;
  overListCards: Card_Schema[];
  area: CardDraggerAreaPosition;
}) {
  const { overCard, area, overListCards } = props;
  const cards = overListCards;
  if (cards.length === 0) return 10;
  const isTop = area === "up";

  const overtCardIndex = cards.findIndex((card) => card.id === overCard.id);

  const prevCard = isTop ? overListCards[overtCardIndex - 1] : overCard;
  const nextCard = isTop ? overCard : overListCards[overtCardIndex + 1];

  if (!prevCard && !nextCard) return 10;

  const prev = prevCard?.position ?? nextCard!.position / 2;
  const next = nextCard?.position ?? prevCard!.position + 10;

  return prev + (next - prev) / 2;
}
