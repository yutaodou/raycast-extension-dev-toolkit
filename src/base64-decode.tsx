import { Action, ActionPanel, Clipboard, closeMainWindow, Detail, showHUD } from "@raycast/api";
import { useEffect, useState } from "react";
import { base64Decode } from "./actions";
import { markdown } from "./utils";

export default function Command() {
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [original, setOriginal] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      const text = await Clipboard.readText();

      if (!text) {
        setError("Clipboard is empty");
        return;
      }

      setOriginal(text);
      const decodedResult = base64Decode(text);

      if ("error" in decodedResult) {
        setError(decodedResult.error.message);
        return;
      }

      setResult(decodedResult.value);
    }
    fetchData();
  }, []);

  if (error) {
    return <Detail markdown={`# Error \n ${error}`} />;
  }

  if (!result) {
    return <Detail isLoading />;
  }

  return (
    <Detail
      navigationTitle="Base64 Decoded"
      markdown={markdown(result)}
      actions={
        <ActionPanel>
          <Action
            title="Copy Decoded Text"
            onAction={async () => {
              await Clipboard.copy(result);
              await closeMainWindow();
              await showHUD("Decoded text copied to clipboard");
            }}
          />
          {original && (
            <Action
              title="Copy Original Text"
              onAction={async () => {
                await Clipboard.copy(original);
                await closeMainWindow();
                await showHUD("Original text copied to clipboard");
              }}
            />
          )}
        </ActionPanel>
      }
    />
  );
}