import { shouldNotBeDefinedPropType } from './base/shouldNotBeDefinedPropType';

const deprecatedPropTypeFactory = shouldNotBeDefinedPropType('deprecated');

export function deprecatedPropType(...args) {
  return deprecatedPropTypeFactory(...args);
}
