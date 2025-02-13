type DiffPatchValue<T> = {
  oldValue: T;
  newValue: T;
};

type DiffPatch<T> = {
  [K in keyof T]?: DiffPatchValue<T[K]>;
};

interface UpdateDiff<T> {
  uniqueValues: Partial<T>;
  diffPatch: DiffPatch<T>;
  hasUpdate: boolean;
}

export function generateUpdateDiff<T>(
  original: T,
  updated: Partial<T>,
): UpdateDiff<T> {
  const diffEntries = Object.entries(updated).filter(([key, value]) => {
    return original[key as keyof T] !== value;
  });
  const uniqueValues = Object.fromEntries(
    diffEntries.map(([key, value]) => [key, value]),
  ) as Partial<T>;
  const diffPatch = Object.fromEntries(
    diffEntries.map(([key, value]) => {
      return [
        key,
        {
          oldValue: original[key as keyof T],
          newValue: value,
        },
      ];
    }),
  ) as DiffPatch<T>;
  const hasUpdate = Object.keys(diffPatch).length > 0;
  return { uniqueValues, diffPatch, hasUpdate };
}
