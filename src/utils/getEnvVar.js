export const getEnvVar = (name, defaultValue = null) => {
  const value = process.env[name];

  if (value === undefined || value === null) {
    if (defaultValue !== null) {
      return defaultValue;
    }
    throw new Error(`Missing: process.env['${name}']`);
  }

  return value;
};
