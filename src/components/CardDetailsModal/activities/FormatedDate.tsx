import { Typography } from "@mui/material";
import { format, parseISO } from "date-fns";

export function FormatedDate(props: { isoDate: string }) {
  const friendlyDate = format(parseISO(props.isoDate), "'on' MMM dd, yyyy");
  return (
    <Typography variant="body2" color="text.secondary">
      {friendlyDate}
    </Typography>
  );
}
