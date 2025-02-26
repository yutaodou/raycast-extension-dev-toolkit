import { runAppleScriptSync } from "run-applescript";
import type { ActionResult, Failure, Success } from "./types";

export const readFromClipboardSync = () => {
  return runAppleScriptSync("the clipboard");
};

export const isSuccess = (result: ActionResult): result is Success => {
  return (result as Success).value !== undefined;
};

export const isFailure = (result: ActionResult): result is Failure => {
  return (result as Failure).error !== undefined;
};

export const markdown = (content: string): string => {
  return `\`\`\`\n${content}\n\`\`\``;
};
