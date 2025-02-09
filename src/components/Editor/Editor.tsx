import { useState } from "react";
import { Markdown } from "src/components/Markdown";
import classNames from "classnames";

interface Props {
  value: string;
  onChange: (value: string) => void;
  autoFocus?: boolean;
}

export function Editor(props: Props) {
  const [tabIndex, setTabIndex] = useState(0);
  const handleChange = (newValue: number) => {
    setTabIndex(newValue);
  };
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white focus-within:outline focus-within:outline-2 focus-within:outline-blue-500">
      <div className="flex border-b border-gray-300 bg-gray-100">
        <button
          className={classNames("px-4 py-2 text-sm", {
            "border-b-2 border-blue-500 font-bold": tabIndex === 0,
          })}
          onClick={() => handleChange(0)}
        >
          Write
        </button>
        <button
          className={classNames("px-4 py-2 text-sm", {
            "border-b-2 border-blue-500 font-bold": tabIndex === 1,
          })}
          onClick={() => handleChange(1)}
        >
          Preview
        </button>
      </div>
      <TabPanel value={tabIndex} index={0}>
        <textarea
          className="h-full w-full border-none p-2 focus:outline-none"
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
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
