import { Header } from "./Header";
import { Description } from "./Description";
import { Sidebar } from "./Sidebar";
import { Activities } from "./Activities";
import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { useApi } from "src/hooks/useApi";
import classNames from "classnames";

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
        "bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black",
        props.isOpen ? "block" : "hidden",
      )}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      <div
        className="relative mx-auto my-6 w-full max-w-3xl bg-white p-4 shadow-lg"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <Header card={card} onClose={props.onClose} />
        <div className="flex flex-row gap-2">
          <div className="flex flex-grow flex-col gap-2">
            <Description card={card} />
            <Activities card={card} />
          </div>
          <Sidebar card={card} onClose={props.onClose} />
        </div>
      </div>
    </div>
  );
}
