import { Record_Schema } from "./record.schema";

export interface Commit_Update_Schema extends Record_Schema {
  diff: unknown;
}
