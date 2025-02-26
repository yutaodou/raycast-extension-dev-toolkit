import { Clipboard, showHUD } from "@raycast/api";
import { base64Decode } from "./actions";

export default async function Command() {
  try {
    const text = await Clipboard.readText();
    
    if (!text) {
      await showHUD("Clipboard is empty");
      return;
    }
    
    const result = base64Decode(text);
    
    if ("error" in result) {
      await showHUD(`Error: ${result.error.message}`);
      return;
    }
    
    await Clipboard.copy(result.value);
    await showHUD(`Decoded: ${result.value}`);
  } catch (error) {
    await showHUD(`Error: ${error instanceof Error ? error.message : String(error)}`);
  }
}