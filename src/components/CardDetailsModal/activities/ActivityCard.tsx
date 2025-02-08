import { SellOutlined } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { FormatedDate } from "./FormatedDate";
import { Activity_Schema } from "src/database/schemas/activity.schema";
import { PropsWithChildren } from "react";

export function ActivityCard(
  props: PropsWithChildren<{ activity: Activity_Schema; activityType?: string }>
) {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <SellOutlined
        sx={{
          color: blueGrey[400],
          fontSize: 16,
          display: "flex",
          alignItems: "center",
          bgcolor: blueGrey[50],
          borderRadius: "100%",
          p: 0.8,
        }}
      />
      <Typography variant="body1">{props.activity.authorId}</Typography>
      <Typography variant="body2" color="text.secondary">
        {props.activityType ?? props.activity.activityType}
      </Typography>
      {props.children}
      <FormatedDate isoDate={props.activity.createdAt} />
    </Stack>
  );
}
