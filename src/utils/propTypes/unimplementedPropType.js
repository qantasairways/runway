import { shouldNotBeDefinedPropType } from './base/shouldNotBeDefinedPropType';

const unimplementedPropTypeFactory = shouldNotBeDefinedPropType(
  'not implemented yet'
);

export function unimplementedPropType(...args) {
  return unimplementedPropTypeFactory(...args);
}
