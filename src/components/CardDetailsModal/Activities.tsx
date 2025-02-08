import { FormatListBulleted } from "@mui/icons-material";
import { Stack, Box, Typography } from "@mui/material";
import { TimelineLine } from "./TimelineLine";
import { ActivitySwitch } from "./activities/ActivitySwitch";
import { CreateActivityComment } from "./CreateActivityComment";
import { useLiveQuery } from "dexie-react-hooks";
import { useApi } from "src/hooks/useApi";
import { Card_Schema } from "src/database/schemas/card.schema";

interface Props {
  card: Card_Schema;
}

export function Activities(props: Props) {
  const db = useApi();
  const acts = useLiveQuery(
    () => db.getActivitiesByCardId(props.card.id),
    [db, props.card.id]
  );
  const activities = acts?.map((activity) => (
    <ActivitySwitch key={activity.id} activity={activity} />
  ));
  return (
    <Box
      display="grid"
      gridTemplateColumns="[icon] 40px [body] minmax(0, 1fr)"
      rowGap={1}
      position="relative"
      sx={{
        "&:hover .sort-button": {
          visibility: "visible",
        },
      }}
    >
      <Icon />
      <Stack direction="row" spacing={2} alignItems="center" width="100%">
        <Typography variant="h6" fontSize={16} flex={1}>
          Activity
        </Typography>
      </Stack>
      <Stack
        style={{ gridColumnStart: "body" }}
        direction="column"
        spacing={2}
        zIndex={1}
      >
        <CreateActivityComment card={props.card} />
        {activities}
      </Stack>
      <TimelineLine />
    </Box>
  );
}

function Icon() {
  return (
    <FormatListBulleted
      sx={{
        display: "flex",
        alignSelf: "center",
        justifySelf: "center",
      }}
    />
  );
}
