import { Clipboard, showHUD } from "@raycast/api";
import { generateUUID } from "./actions";

export default async function Command() {
  try {
    const result = generateUUID();
    
    if ("error" in result) {
      await showHUD(`Error: ${result.error.message}`);
      return;
    }
    
    await Clipboard.copy(result.value);
    await showHUD(`UUID: ${result.value}`);
  } catch (error) {
    await showHUD(`Error: ${error instanceof Error ? error.message : String(error)}`);
  }
}