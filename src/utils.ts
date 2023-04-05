import { runAppleScriptSync } from "run-applescript";
import { Success, ActionResult, Failure } from "./types";

export const readFromClipboardSync = () => {
  return runAppleScriptSync("the clipboard");
};

export function isSuccess(result: ActionResult): result is Success {
  return (result as Success).value !== undefined;
}

export function isFailure(result: ActionResult): result is Failure {
  return (result as Failure).error !== undefined;
}

export function markdown(result: ActionResult): string {
  if (isFailure(result)) {
    return "";
  }

  const { value, type = "string" } = result;
  return type === "string" ? value : "```\n" + value + "\n```";
}
