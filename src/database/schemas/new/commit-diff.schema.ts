export type Commit_Diff_Schema<T, K extends keyof T> = {
  [Key in K]?: DiffValue<T[Key]>;
};

type DiffValue<T> = {
  from: T | undefined;
  to: T;
};
