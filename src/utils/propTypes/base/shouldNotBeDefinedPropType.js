export function shouldNotBeDefinedPropType(type) {
  return (validator, reason) => {
    if (process.env.NODE_ENV === 'production') {
      return () => null;
    }

    return (props, propName, componentName, location, propFullName) => {
      const componentNameSafe = componentName || '<<anonymous>>';
      const propFullNameSafe = propFullName || propName;

      return propName in props
        ? new Error(
            `The ${location} \`${propFullNameSafe}\` of ` +
              `\`${componentNameSafe}\` is ${type}. ${reason}`
          )
        : null;
    };
  };
}
