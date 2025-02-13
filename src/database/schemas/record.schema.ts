import { RecordType } from "./record-type";

export interface Record_Schema {
  type: RecordType;
  readonly id: string;
  readonly authorId: string;
  readonly createdAt: string;
}
