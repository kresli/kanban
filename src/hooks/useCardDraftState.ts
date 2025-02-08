import { liveQuery } from "dexie";
import { useCallback, useState } from "react";
import { Api } from "src/api";
import { Card_Schema } from "src/database/schemas/card.schema";

export interface CardDraft {
  card: Card_Schema | null;
  update(
    props: Partial<Pick<Card_Schema, "title" | "position" | "listId">>
  ): void;
  setCardDrag(card: Card_Schema): void;
  saveCard: () => Promise<void>;
  clearCard(): void;
}
export function useCardDraftState(db: Api): CardDraft {
  const [originalCard, setOriginalCard] = useState<Card_Schema | null>(null);
  const [card, setCard] = useState<Card_Schema | null>(null);

  const update: CardDraft["update"] = useCallback((props) => {
    setCard((card) => {
      if (!card) return card;
      const isObjectSame = Object.entries(props).every(
        ([key, value]) => card[key as keyof Card_Schema] === value
      );
      if (isObjectSame) return card;

      return { ...card, ...props };
    });
  }, []);

  const setCardDrag: CardDraft["setCardDrag"] = useCallback((card) => {
    setCard(card);
    setOriginalCard(card);
  }, []);

  const saveCard: CardDraft["saveCard"] = useCallback(async () => {
    if (!card || !originalCard) return;
    const observable = liveQuery(() => db.getCardById(card.id));
    const subscribtion = observable.subscribe((card) => {
      if (!card) return;
      subscribtion.unsubscribe();
      setCard(null);
    });
    const payload: Record<string, unknown> = {};
    for (const k in card) {
      const key = k as keyof Card_Schema;
      if (card[key] !== originalCard[key]) {
        const change = {
          oldValue: originalCard[key],
          newValue: card[key],
        };
        payload[k] = change;
      }
    }
    db.emitActivity({
      cardId: card.id,
      activityType: "card_update",
      authorId: "user",
      createdAt: db.generateDate(),
      id: db.generateId(),
      payload,
    });
  }, [db, card, originalCard]);

  const clearCard: CardDraft["clearCard"] = useCallback(() => {
    setCard(null);
    setOriginalCard(null);
  }, []);

  return {
    card: card,
    update,
    setCardDrag,
    saveCard,
    clearCard,
  };
}
