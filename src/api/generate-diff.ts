import { Commit_Diff_Schema } from "src/database/schemas/new/commit-diff.schema";

export function generateDiff<T>(
  updated: Partial<T>,
  original?: T,
): Commit_Diff_Schema<T, keyof T> {
  const diff: Commit_Diff_Schema<T, keyof T> = {};
  for (const key in updated) {
    if (updated[key] === original?.[key]) continue;
    diff[key as keyof T] = {
      from: original?.[key],
      to: updated[key] as T[keyof T],
    };
  }
  return diff;
}
