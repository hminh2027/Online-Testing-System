export async function catchAsync<T, U>(
  promise: Promise<T>,
  errorExt?: object,
): Promise<[U, null] | [null, T]> {
  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[U, null]>((err: U) => {
      if (!errorExt) return [err, null];

      const parsedError = {
        ...err,
        ...errorExt,
      };

      return [parsedError, null];
    });
}
