import { Edit } from "@mui/icons-material";
import { Input, IconButton } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { useRef } from "react";
import { useBoolean } from "src/hooks/useBoolean";
import { useText } from "src/hooks/useText";

export function Title(props: {
  onChange: (value: string) => void;
  value: string;
}) {
  const isEditing = useBoolean();
  const text = useText();

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      text.setValue(props.value);
      isEditing.setFalse();
      return;
    }
    if (e.key !== "Enter") return;
    if (e.shiftKey) return;
    props.onChange(text.value);
    isEditing.setFalse();
  };
  const onBlur = () => {
    console.log("onBlur");
    props.onChange(text.value);
    isEditing.setFalse();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    text.setValue(e.target.value);
  };

  const onEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    isEditing.setTrue();
    text.setValue(props.value);
  };

  const ref = useRef<HTMLDivElement>(null);

  const value = isEditing.value ? text.value : props.value;

  return (
    <>
      <Input
        ref={ref}
        value={value}
        onChange={onChange}
        fullWidth
        multiline
        disableUnderline={!isEditing.value}
        onClick={(e) => isEditing.value && e.stopPropagation()}
        sx={{
          "& .MuiInputBase-input.Mui-disabled": {
            color: "black !important",
            WebkitTextFillColor: "black !important",
            pointerEvents: "none",
          },
        }}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        size="medium"
        disabled={!isEditing.value}
      />
      <IconButton
        onClick={onEditClick}
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
