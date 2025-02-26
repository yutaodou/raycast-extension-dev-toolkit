import { Clipboard, showHUD } from "@raycast/api";
import { localDateISO8601 } from "./actions";

export default async function Command() {
  try {
    const result = localDateISO8601();
    
    if ("error" in result) {
      await showHUD(`Error: ${result.error.message}`);
      return;
    }
    
    await Clipboard.copy(result.value);
    await showHUD(`Local Date: ${result.value}`);
  } catch (error) {
    await showHUD(`Error: ${error instanceof Error ? error.message : String(error)}`);
  }
}