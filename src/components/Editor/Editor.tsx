import { Box, Tab, Tabs, TextField } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { useState } from "react";
import { Markdown } from "src/components/Markdown";

interface Props {
  value: string;
  onChange: (value: string) => void;
  autoFocus?: boolean;
}

export function Editor(props: Props) {
  const [tabIndex, setTabIndex] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };
  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: blueGrey[100],
        background: "white",
        borderRadius: 2,
        display: "flex",
        flex: 1,
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
        "&:focus-within": {
          outline: `2px solid`,
          outlineColor: "primary.main",
        },
      }}
    >
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          bgcolor: blueGrey[50],
        }}
      >
        <Tabs value={tabIndex} onChange={handleChange}>
          <Tab label="Write" />
          <Tab label="Preview" />
        </Tabs>
      </Box>
      <TabPanel value={tabIndex} index={0}>
        <TextField
          multiline
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          fullWidth
          autoFocus={props.autoFocus}
          variant="standard"
          slotProps={{
            input: {
              sx: {
                padding: 2,
                "&:before": {
                  borderBottom: "none",
                },
                "&:after": {
                  borderBottom: "none",
                },
                "&:hover:not(.Mui-disabled):before": {
                  borderBottom: "none",
                },
              },
            },
          }}
        />
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <Box p={2}>
          <Markdown>{props.value}</Markdown>
        </Box>
      </TabPanel>
    </Box>
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
      hidden={props.value !== props.index}
      style={{ overflow: "auto" }}
    >
      {props.value === props.index && <div>{props.children}</div>}
    </div>
  );
}
