import { runAppleScriptSync } from "run-applescript"

export const readFromClipboardSync = () => {
  return runAppleScriptSync("the clipboard");
};
