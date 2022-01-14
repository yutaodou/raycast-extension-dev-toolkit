import getUnixTime from 'date-fns/getUnixTime';
import formatISO from "date-fns/formatISO"

export type ActionResult = {
  value?: any;
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


export const localTimestamp = () => {
  const now = new Date();
  const timestamp = getUnixTime(now);
  return { value: timestamp.toString() }
}

export const localDateISO8601 = () => {
  const now = new Date()
  return { value: formatISO(now) }
}