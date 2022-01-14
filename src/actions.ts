export type ActionResult = {
  value?: string;
  error?: Error;
};

export const base64Encode = (input: string): ActionResult => {
  const buffer = Buffer.from(input, "utf-8");
  return { value: buffer.toString("base64") };
};

export const base64Decode = (input: string): ActionResult => {
  const buffer = Buffer.from(input, "base64");
  return { value: buffer.toString("utf-8") };
};
