import { Box, Paper, SxProps, Theme } from "@mui/material";
import { PropsWithChildren } from "react";

export function CardPaper(
  props: PropsWithChildren<{
    onDragOver?: (e: React.DragEvent) => void;
    isDragging?: boolean;
    onDragStart?: (event: React.DragEvent) => void;
    onClick?: () => void;
  }>
) {
  const hoveredStyle: SxProps<Theme> = {
    outlineOffset: 1,
    outlineStyle: "solid",
    outlineColor: "primary.main",
    outlineWidth: props.isDragging ? 0 : 2,
    cursor: "pointer",
  };
  const paperStyle: SxProps<Theme> = {
    zIndex: 0,
    padding: 1,
    elevation: 1,
    overflow: "hidden",
    borderRadius: 1,
    position: "relative",
    "&:hover": hoveredStyle,
    "&:hover .icon-button": {
      visibility: "visible",
    },
  };
  return (
    <Box
      paddingLeft={1}
      paddingRight={1}
      paddingTop={0.5}
      paddingBottom={0.5}
      onDragOver={props.onDragOver}
      sx={{ opacity: props.isDragging ? 0.5 : 1 }}
      onClick={props.onClick}
    >
      <Paper sx={paperStyle} draggable={true} onDragStart={props.onDragStart}>
        {props.children}
      </Paper>
    </Box>
  );
}
