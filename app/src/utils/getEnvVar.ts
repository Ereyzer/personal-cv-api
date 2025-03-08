export function getEnvVar(
  name: string,
  defaultValue: string | undefined = undefined
): string | never {
  const value: string | undefined = process.env[name];

  if (value) return value;
  if (defaultValue) return defaultValue;
  throw new Error(`Missing process.env.${name}`);
}
