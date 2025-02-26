import { Clipboard, showHUD } from "@raycast/api";
import { prettifyJSON } from "./actions";

export default async function Command() {
  try {
    const text = await Clipboard.readText();
    
    if (!text) {
      await showHUD("Clipboard is empty");
      return;
    }
    
    const result = prettifyJSON(text);
    
    if ("error" in result) {
      await showHUD(`Error: ${result.error.message}`);
      return;
    }
    
    await Clipboard.copy(result.value);
    
    // Show a short preview if the output is long
    const shortenedValue = result.value.length > 50 
      ? result.value.substring(0, 47) + "..." 
      : result.value;
    
    await showHUD(`JSON prettified: ${shortenedValue}`);
  } catch (error) {
    await showHUD(`Error: ${error instanceof Error ? error.message : String(error)}`);
  }
}