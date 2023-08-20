import type { QueryParamConfig } from 'use-query-params';
import {
  decodeDelimitedArray,
  encodeDelimitedArray,
  StringParam,
} from 'use-query-params';

export const CommaArrayParam = {
  encode: (array: string[] | null | undefined) => {
    if (array?.length === 0) return encodeDelimitedArray(undefined, ',');

    return encodeDelimitedArray(array, ',');
  },
  decode: (arrayStr: string | (string | null)[] | null | undefined) =>
    decodeDelimitedArray(arrayStr, ','),
};

export const CommaArrayParamWIthDefault = (
  defaultValue: string[] | string,
) => ({
  encode: (array: string[] | null | undefined) => {
    if (array?.length === 0) return encodeDelimitedArray(undefined, ',');

    return encodeDelimitedArray(array, ',');
  },
  decode: (arrayStr: string | (string | null)[] | null | undefined) =>
    decodeDelimitedArray(arrayStr, ','),
  default: defaultValue,
});

export function validatedNumberParamWithDefault(
  validator: (value: number) => boolean,
  defaultValue: number,
): QueryParamConfig<number | null | undefined, number> {
  return {
    decode: (value): number => {
      const number = Number(value);

      return validator(number) ? number : defaultValue;
    },
    encode: (value) => value?.toString(),
    default: defaultValue,
  };
}

export const PageParams = validatedNumberParamWithDefault(
  (value) =>
    Number.isInteger(value) && Number.isSafeInteger(value) && value >= 0,
  0,
);

export const SizeParams = validatedNumberParamWithDefault(
  (value) => Number.isInteger(value) && value >= 0,
  0,
);

export const defaultParams = {
  page: PageParams,
  size: SizeParams,
  sort: CommaArrayParam,
  q: StringParam,
};

export default {};
