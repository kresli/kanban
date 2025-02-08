import { Box, Stack, SxProps, Theme, Typography } from "@mui/material";
import { PropsWithChildren } from "react";

interface Props {
  title?: string;
  sx?: SxProps<Theme>;
  actions?: React.ReactNode;
}

export function NavbarGroup(props: PropsWithChildren<Props>) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        py: 1,
        width: "100%",
        ...props.sx,
      }}
    >
      {props.title && (
        <Box
          sx={{
            px: 2,
            pb: 2,
            opacity: 0.5,
            display: "flex",
            direction: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {props.title}
          </Typography>
          {props.actions}
        </Box>
      )}
      <Stack
        sx={{
          px: 1,
          gap: 0.5,
        }}
      >
        {props.children}
      </Stack>
    </Box>
  );
}
