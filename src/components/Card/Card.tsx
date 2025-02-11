import { EditableTitle } from "./EditableTitle";
import { ReadonlyTitle } from "./ReadonlyTitle";
import { DropAreas } from "./DropAreas";
import { createDragPreview } from "./create-drag-preview";
import { CardPaper } from "./CardPaper";
import { useBoolean } from "src/hooks/useBoolean";
import { useText } from "src/hooks/useText";
import { useLiveQuery } from "dexie-react-hooks";
import { useApi } from "src/hooks/useApi";
import { Card_Schema } from "src/database/schemas/card.schema";
import { CardDraft } from "src/hooks/useCardDraftState";
import { useNavigate } from "react-router";
import { BASE_URL } from "src/contants";
import classNames from "classnames";

interface Props {
  cardId: string;
  opacity?: number;
  cardDraft: CardDraft;
}

export function Card(props: Props) {
  const db = useApi();
  const cardQuery = useLiveQuery(
    () => db.card.getById(props.cardId),
    [db, props.cardId],
  );
  const { cardDraft } = props;
  const navigate = useNavigate();

  const onDragStart = async (event: React.DragEvent) => {
    if (!cardQuery) return;
    createDragPreview(event);
    cardDraft.setCardDrag(cardQuery);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onModalOpen = () => navigate(`${BASE_URL}/card/${props.cardId}`);

  if (!cardQuery) return null;
  const isDragging = cardDraft.card?.id === cardQuery.id;
  const card = isDragging ? cardDraft.card : cardQuery;
  if (!card) return null;
  return (
    <>
      <CardPaper
        onDragOver={onDragOver}
        isDragging={isDragging}
        onDragStart={onDragStart}
        onClick={onModalOpen}
      >
        <Title isDragging={isDragging} card={card} />
        <DropAreas card={card} cardDraft={props.cardDraft} />
      </CardPaper>
    </>
  );
}

function Title(props: { isDragging: boolean; card: Card_Schema }) {
  const { isDragging, card } = props;
  const draftTitle = useText();
  const isEdit = useBoolean();
  return (
    <div
      className={classNames(
        "flex flex-col",
        isDragging ? "opacity-0" : "opacity-100",
      )}
    >
      <ReadonlyTitle card={card} draftTitle={draftTitle} isEdit={isEdit} />
      <EditableTitle card={card} draftTitle={draftTitle} isEdit={isEdit} />
    </div>
  );
}
