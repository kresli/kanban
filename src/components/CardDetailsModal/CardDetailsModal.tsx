import { Box, Modal, Paper, Stack, SxProps, Theme } from "@mui/material";
import { Header } from "./Header";
import { Description } from "./Description";
import { Sidebar } from "./Sidebar";
import { Activities } from "./Activities";
import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { useApi } from "src/hooks/useApi";

const style: SxProps<Theme> = {
  width: "100%",
  mx: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  px: 2,
  pt: 2,
  pb: 8,
  maxWidth: 768,
  my: 6,
  rowGap: 2,
  display: "flex",
  flexDirection: "column",
};

interface Props {
  cardId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function CardDetailsModal(props: Props) {
  const db = useApi();
  const card = useLiveQuery(
    () => db.getCardById(props.cardId),
    [db, props.cardId]
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
    <Modal
      open={props.isOpen}
      onClose={props.onClose}
      disableAutoFocus
      sx={rootSx}
    >
      <Box
        sx={{ minWidth: "100%" }}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      >
        <Paper sx={style} onMouseDown={(e) => e.stopPropagation()}>
          <Header card={card} onClose={props.onClose} />
          <Stack direction="row" spacing={2} flexGrow={1}>
            <Stack flexGrow={1} rowGap={2} direction="column">
              <Description card={card} />
              <Activities card={card} />
            </Stack>
            <Sidebar card={card} onClose={props.onClose} />
          </Stack>
        </Paper>
      </Box>
    </Modal>
  );
}

const rootSx: SxProps<Theme> = {
  overflowY: "auto",
  paddingBottom: 4,
};
