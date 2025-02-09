import { Header } from "./Header";
import { Description } from "./Description";
import { Sidebar } from "./Sidebar";
import { Activities } from "./Activities";
import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { useApi } from "src/hooks/useApi";
import classNames from "classnames";
import { Card_Schema } from "src/database/schemas/card.schema";

interface Props {
  cardId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function CardDetailsModal(props: Props) {
  const db = useApi();
  const card = useLiveQuery(
    () => db.getCardById(props.cardId),
    [db, props.cardId],
  );
  const [mouseDownOnBackground, setMouseDownOnBackground] = useState(false);

  if (!card) return null;

  const onMouseUp = () => {
    if (!mouseDownOnBackground) return;
    props.onClose();
    setMouseDownOnBackground(false);
  };

  const onMouseDown = () => setMouseDownOnBackground(true);

  return (
    <div
      className={classNames(
        "bg-opacity-50 fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center overflow-auto bg-black/10",
        props.isOpen ? "block" : "hidden",
      )}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      <div className="absolute top-12">
        <div
          className="relative mb-24 box-border h-full w-full max-w-3xl items-start justify-center space-y-4 rounded-lg border border-primary-300 bg-white shadow-lg"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <Header card={card} onClose={props.onClose} />
          <div className="flex flex-row gap-2 p-8 pt-4">
            <Content card={card} />
            <Sidebar card={card} onClose={props.onClose} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Content(props: { card: Card_Schema }) {
  return (
    <div className="flex flex-grow flex-col gap-8">
      <Activities card={props.card} />
    </div>
  );
}
