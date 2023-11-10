type Option<T> = { label: T | string | number; value: T | string | number };

export function transformToAntdSelectOptions<T, K extends keyof T>(
  rawData: T[],
  label: K,
  value: K,
): Option<T[K]>[] {
  return rawData.map((item) => ({
    label: item[label],
    value: item[value],
  }));
}
