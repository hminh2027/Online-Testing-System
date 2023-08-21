import { isArray } from 'lodash';

import type { Resource, ResponseItem } from '@/models/common';

export function getFilteredList<Y extends Resource>(
  old: ResponseItem<Y[]>,
  id: string | number,
): { data: Y[] } {
  let content: Y[] = [];

  if (isArray(old.body)) content = old.body.filter((item) => item.id !== id);
  else if (isArray(old.body.content))
    content = old.body.content.filter((item) => item.id !== id);

  return {
    data: content,
  };
}

export default {};
