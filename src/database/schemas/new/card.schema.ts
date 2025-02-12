export interface Card_Schema {
  readonly id: string;
  readonly authorId: string;
  readonly createdAt: string;
  title: string;
  listId: string;
  position: number;
  commitId: string;
}
