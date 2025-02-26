import { Clipboard, showHUD } from "@raycast/api";
import { localTimestampInMilliseconds } from "./actions";

export default async function Command() {
  try {
    const result = localTimestampInMilliseconds();
    
    if ("error" in result) {
      await showHUD(`Error: ${result.error.message}`);
      return;
    }
    
    await Clipboard.copy(result.value);
    await showHUD(`Timestamp (ms): ${result.value}`);
  } catch (error) {
    await showHUD(`Error: ${error instanceof Error ? error.message : String(error)}`);
  }
}