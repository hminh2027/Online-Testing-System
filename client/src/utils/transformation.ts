type Option<T> = { label: T | string | number; value: T | string | number };

export function transformToAntdSelectOptions<T, K extends keyof T>(
  rawData: T[],
  label: K,
  value: K,
  labelFormatter?: (value: T[K], index: number, context?: T) => string,
  valueFormatter?: (value: T[K], index: number, context?: T) => string,
): Option<T[K]>[] {
  return rawData.map((item, index) => ({
    label: labelFormatter ? labelFormatter(item[label], index, item) : item[label],
    value: valueFormatter ? valueFormatter(item[value], index, item) : item[value],
  }));
}
