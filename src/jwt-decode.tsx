import { Clipboard, showHUD } from "@raycast/api";
import { decodeJWT } from "./actions";

export default async function Command() {
  try {
    const text = await Clipboard.readText();

    if (!text) {
      await showHUD("Clipboard is empty");
      return;
    }

    const result = decodeJWT(text);

    if ("error" in result) {
      await showHUD(`Error: ${result.error.message}`);
      return;
    }

    await Clipboard.copy(result.value);

    // Parse the decoded JSON to extract some useful information for the preview
    try {
      const decoded = JSON.parse(result.value);
      const subject = decoded.sub ? `sub: ${decoded.sub}` : '';
      const issuer = decoded.iss ? `iss: ${decoded.iss}` : '';
      const info = [subject, issuer].filter(Boolean).join(', ');

      await showHUD(`JWT decoded: ${info || 'Token copied to clipboard'}`);
    } catch {
      // If parsing fails, just show a generic message
      await showHUD("JWT decoded and copied to clipboard");
    }
  } catch (error) {
    await showHUD(`Error: ${error instanceof Error ? error.message : String(error)}`);
  }
}