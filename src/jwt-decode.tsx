import { Action, ActionPanel, Clipboard, closeMainWindow, Detail, showHUD } from "@raycast/api";
import { useEffect, useState } from "react";
import { decodeJWT } from "./actions";
import { markdown } from "./utils";

export default function Command() {
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      const text = await Clipboard.readText();

      if (!text) {
        setError("Clipboard is empty");
        return;
      }

      const decodedResult = decodeJWT(text);
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
      navigationTitle="Decoded JWT"

      markdown={markdown(result)}
      actions={
        <ActionPanel>
          <Action
            title="Copy JSON"
            onAction={async () => {
              await Clipboard.copy(result);
              await closeMainWindow();
              await showHUD("JWT copied to clipboard");
            }}
          />
        </ActionPanel>
      }
    />
  );
}