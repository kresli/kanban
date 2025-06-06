import { Card } from "src/components/Card";
import { Header } from "./Header";
import { ScrollContainer } from "./ScrollContainer";
import { CreateCardButton } from "./CreateCardButton";
import { CreateCard } from "src/components/Card/CreateCard";
import { useApi } from "src/hooks/useApi";
import { useLiveQuery } from "dexie-react-hooks";
import { Card_Schema, CardData } from "src/database/schemas/card.schema";
import { CardDraft } from "src/hooks/useCardDraftState";
import { useState } from "react";
import { Api } from "src/api";
import { generateId } from "src/api/generate-id";

export interface Props {
  listId: string;
  cardDraft: CardDraft;
}

export function List(props: Props) {
  const { cardDraft } = props;
  const [newCardData, setNewCardData] = useState<CardData | null>(null);

  const api = useApi();
  const listCards = useLiveQuery(
    () => api.card.getByListId(props.listId),
    [api, props.listId],
  );
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    cardDraft.saveCard();
  };
  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!listCards) return;
    const lastCard = listCards.at(listCards.length - 1);
    if (lastCard?.id === cardDraft.card?.id) return;
    cardDraft.update({
      listId: props.listId,
      position: lastCard ? lastCard.position + 10 : 10,
    });
  };

  const onSubmitNewCard = async () => {
    if (!newCardData) return;
    if (newCardData.title) {
      await api.card.create({
        title: newCardData.title,
        listId: newCardData.listId,
        position: newCardData.position,
      });
    }
    setNewCardData(null);
  };

  const onCreateNewCardClick = () => {
    if (!listCards) return;
    const position = Math.max(...listCards.map((card) => card.position), 10);
    const card: CardData = {
      title: "",
      listId: props.listId,
      position,
    };
    setNewCardData(card);
  };

  const cardsArr = getCards(props.listId, listCards, cardDraft);
  const cards = cardsArr.map((card) => (
    <Card key={card.id} cardId={card.id} cardDraft={cardDraft} />
  ));

  const newCard = newCardData && (
    <CreateCard
      cardDraft={newCardData}
      onChange={setNewCardData}
      onSubmit={onSubmitNewCard}
    />
  );

  return (
    <div className="h-full px-1.5" onDragOver={onDragOver} onDrop={onDrop}>
      <div className="flex h-auto max-h-full max-w-[275px] min-w-[275px] flex-1 flex-col overflow-hidden rounded-lg border border-rim bg-bg-main">
        <Header listId={props.listId} />
        <ScrollContainer>
          {cards}
          {newCard}
        </ScrollContainer>
        <CreateCardButton onClick={onCreateNewCardClick} />
      </div>
    </div>
  );
}

function getCards(
  listId: string,
  listCards: Card_Schema[] = [],
  cardDraft: CardDraft,
) {
  const { card } = cardDraft;
  if (!card) return listCards;

  const cards = listCards.filter((t) => t.id !== card.id);

  if (card.listId === listId) cards.push(card);

  return cards.sort((a, b) => a.position - b.position);
}
