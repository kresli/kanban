import { useState } from "react";
import { Markdown } from "src/components/Markdown";
import classNames from "classnames";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  autoFocus?: boolean;
}

export function Editor(props: Props) {
  const [tabIndex, setTabIndex] = useState(0);
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    props.onChange(e.target.value);
  };
  const onKeydown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.metaKey) {
      e.preventDefault();
      props.onSubmit(props.value);
    }
  };
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-rim bg-white focus-within:outline-2 focus-within:outline-secondary-500">
      <div className="flex h-[41px] border-b border-gray-300 bg-gray-100">
        <button
          className={classNames("px-4 py-2 text-sm", {
            "border-b-2 border-secondary-500 font-bold": tabIndex === 0,
          })}
          onClick={() => setTabIndex(0)}
        >
          Write
        </button>
        <button
          className={classNames("px-4 py-2 text-sm", {
            "border-b-2 border-secondary-500 font-bold": tabIndex === 1,
          })}
          onClick={() => setTabIndex(1)}
        >
          Preview
        </button>
      </div>
      <TabPanel value={tabIndex} index={0}>
        <textarea
          data-testid="editor"
          className="h-full w-full border-none p-4 focus:outline-none"
          value={props.value}
          onKeyDown={onKeydown}
          onChange={onChange}
          autoFocus={props.autoFocus}
        />
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <div className="p-2">
          <Markdown>{props.value}</Markdown>
        </div>
      </TabPanel>
    </div>
  );
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      className={classNames({ hidden: props.value !== props.index })}
    >
      {props.value === props.index && <div>{props.children}</div>}
    </div>
  );
}
