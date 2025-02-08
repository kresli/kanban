import { Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { useLiveQuery } from "dexie-react-hooks";
import { useApi } from "src/hooks/useApi";

interface Props {
  listId: string;
}

export function Header(props: Props) {
  const db = useApi();
  const list = useLiveQuery(
    () => db.getListById(props.listId),
    [db, props.listId]
  );
  return (
    <Typography
      variant="subtitle1"
      textAlign="center"
      sx={{
        color: blueGrey[800],
      }}
      padding={1}
    >
      {list?.title}
    </Typography>
  );
}
