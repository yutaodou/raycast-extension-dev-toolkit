import { randomUUID } from "crypto";
import formatISO from "date-fns/formatISO";
import getUnixTime from "date-fns/getUnixTime";
import toDate from "date-fns/toDate";
import jwt from "jsonwebtoken";
import { ActionResult } from "./types";

const EMPTY_INPUT_ERROR = new Error("Empty input");

const stringResult = (value: string): ActionResult => {
  return { type: "string", value };
};

export const base64Encode = (input: string): ActionResult => {
  if (!input) {
    throw EMPTY_INPUT_ERROR;
  }

  const buffer = Buffer.from(input, "utf-8");
  return stringResult(buffer.toString("base64"));
};

export const base64Decode = (input: string): ActionResult => {
  if (!input) {
    throw EMPTY_INPUT_ERROR;
  }

  const buffer = Buffer.from(input, "base64");
  return stringResult(buffer.toString("utf-8"));
};

export const localTimestamp = (): ActionResult => {
  const now = new Date();
  const timestamp = getUnixTime(now);
  return stringResult(timestamp.toString());
};

export const localTimestampInMilliseconds = (): ActionResult => {
  const now = new Date();
  return stringResult(now.getTime().toString());
};

export const localDateISO8601 = (): ActionResult => {
  const now = new Date();
  return stringResult(formatISO(now));
};

export const timestampMillisecondToDateString = (input: string): ActionResult => {
  if (!input) {
    throw EMPTY_INPUT_ERROR;
  }

  try {
    return stringResult(formatISO(toDate(parseInt(input))));
  } catch {
    return { error: Error("Expect timestamp value in milliseconds") };
  }
};

export const timestampSecondsToDateString = (input: string): ActionResult => {
  if (!input) {
    throw EMPTY_INPUT_ERROR;
  }

  try {
     return stringResult(formatISO(toDate(parseInt(input) * 1000)));
  } catch {
    return { error: Error("Expect a timestamp value in seconds") };
  }
};

export const prettifyJSON = (input: string): ActionResult => {
  if (!input) {
    throw EMPTY_INPUT_ERROR;
  }

  try {
    const parsed = JSON.parse(input);
    return { value: JSON.stringify(parsed, null, 4), type: "code" };
  } catch {
    return { error: Error("Invalid JSON input") };
  }
};

export const minifyJSON = (input: string): ActionResult => {
  try {
    const parsed = JSON.parse(input);
    return { value: JSON.stringify(parsed), type: "code" };
  } catch {
    return { error: Error("Invalid JSON input") };
  }
};

export const encodeURL = (input: string): ActionResult => {
  if (!input) {
    throw EMPTY_INPUT_ERROR;
  }

  try {
    const url = new URL(input);
    const searchParams: string[] = [];
    url.searchParams.forEach((value: string, key: string) => {
      searchParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    });

    return stringResult(`${url.origin}${url.pathname}${searchParams.length > 0 ? "?" + searchParams.join("&") : ""}`);
  } catch {
    return { error: Error("Invalid URL") };
  }
};

export const decodeURL = (input: string): ActionResult => {
  if (!input) {
    throw EMPTY_INPUT_ERROR;
  }

  try {
    const url = new URL(input);

    return stringResult(`${url.origin}${url.pathname}${decodeURIComponent(url.search)}`);
  } catch {
    return { error: Error("Invalid URL") };
  }
};

export const decodeJWT = (token: string): ActionResult => {
  if (!token) {
    throw EMPTY_INPUT_ERROR;
  }

  const decoded = jwt.decode(token);
  return decoded ? { value: JSON.stringify(decoded, null, 4), type: "code" } : { error: Error("Invalid JWT token") };
};

export const generateUUID = (): ActionResult => {
  return stringResult(randomUUID());
};

export const generateUUID2 = (): ActionResult => {
  return stringResult(randomUUID());
}