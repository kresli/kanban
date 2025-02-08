import { Box } from "@mui/material";
import { PropsWithChildren } from "react";

export function ScrollContainer(props: PropsWithChildren) {
  return (
    <Box
      flex={1}
      textAlign="center"
      display="flex"
      flexDirection="column"
      overflow="auto"
      sx={
        {
          // "&::-webkit-scrollbar": {
          //   backgroundColor: "transparent",
          //   width: "8px",
          //   border: "2px solid transparent",
          // },
          // "&::-webkit-scrollbar-track": {
          //   backgroundColor: "red",
          //   border: "2px solid transparent",
          // },
          // "&::-webkit-scrollbar-thumb": {
          //   backgroundColor: "rgba(0, 0, 0, 0.2)",
          //   borderRadius: "4px",
          //   width: "1px",
          // },
        }
      }
    >
      <Box>{props.children}</Box>
    </Box>
  );
}
