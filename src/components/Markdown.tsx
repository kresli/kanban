import { Box, SxProps, Theme } from "@mui/material";
import ReactMarkdown from "react-markdown";

interface Props {
  children: string | undefined | null;
  sx?: SxProps<Theme>;
}

export function Markdown(props: Props) {
  return (
    <Box
      sx={[
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
        (theme) => ({
          fontFamily: theme.typography.body1.fontFamily,
          fontSize: theme.typography.body1.fontSize,
          fontStyle: theme.typography.body1.fontStyle,
          fontWeight: theme.typography.body1.fontWeight,
          lineHeight: theme.typography.body1.lineHeight,
          letterSpacing: theme.typography.body1.letterSpacing,
        }),
        {
          "& > p": {
            margin: 0,
          },
        },
      ]}
    >
      <ReactMarkdown>{props.children}</ReactMarkdown>
    </Box>
  );
}
