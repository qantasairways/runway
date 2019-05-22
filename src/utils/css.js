// eslint-disable-next-line import/prefer-default-export
export const toCx = classSelector => classSelector.substring(1);

export const forAll = (...selectors) => selectors.join(', ');
