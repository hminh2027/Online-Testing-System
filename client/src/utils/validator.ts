import type { Rule } from 'antd/es/form';
import type { Schema } from 'yup';

export function createValidator<T>(schema: Schema<T>): Rule {
  return () => ({
    async validator(rule, value: unknown) {
      const { field } = rule as { field: keyof T };

      await schema.validateAt(field as string, { [field]: value });
    },
  });
}
