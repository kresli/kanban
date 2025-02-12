export interface Comment_Schema {
  readonly type: "comment";
  readonly id: string;
  readonly cardId: string;
  readonly createdAt: string;
  readonly authorId: string;
  text: string;
  commitId: string;
}
