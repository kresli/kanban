import { Typography, IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { blueGrey } from "@mui/material/colors";
import { UseBoolean } from "src/hooks/useBoolean";
import { UseText } from "src/hooks/useText";
import { Card_Schema } from "src/database/schemas/card.schema";

interface Props {
  card: Card_Schema;
  draftTitle: UseText;
  isEdit: UseBoolean;
}

export function ReadonlyTitle(props: Props) {
  if (props.isEdit.value) return null;
  const onClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    props.isEdit.setTrue();
    props.draftTitle.setValue(props.card.title);
  };
  return (
    <>
      <Typography
        gutterBottom
        variant="body1"
        component="span"
        textAlign="start"
        margin={0}
      >
        {props.card.title}
      </Typography>
      <IconButton
        onClick={onClick}
        className="icon-button"
        size="small"
        sx={{
          visibility: "hidden",
          position: "absolute",
          top: 4,
          right: 4,
          backgroundColor: "white",
          "&:hover": {
            backgroundColor: blueGrey[50],
          },
        }}
      >
        <Edit fontSize="small" />
      </IconButton>
    </>
  );
}
