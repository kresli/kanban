import { Add } from "@mui/icons-material";
import { Box, Button } from "@mui/material";

interface Props {
  onClick: () => void;
}

export function CreateCardButton(props: Props) {
  return (
    <Box>
      <Button
        onClick={props.onClick}
        variant="text"
        sx={{ margin: 1 }}
        startIcon={<Add />}
      >
        Add Card
      </Button>
    </Box>
  );
}
