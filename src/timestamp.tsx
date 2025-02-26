import { Clipboard, showHUD } from "@raycast/api";
import { localTimestamp } from "./actions";

export default async function Command() {
  try {
    const result = localTimestamp();
    
    if ("error" in result) {
      await showHUD(`Error: ${result.error.message}`);
      return;
    }
    
    await Clipboard.copy(result.value);
    await showHUD(`Timestamp: ${result.value}`);
  } catch (error) {
    await showHUD(`Error: ${error instanceof Error ? error.message : String(error)}`);
  }
}