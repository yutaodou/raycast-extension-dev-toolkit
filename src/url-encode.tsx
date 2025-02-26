import React, { useEffect, useState } from "react";
import { Action, ActionPanel, Clipboard, closeMainWindow, Detail, popToRoot, showHUD, showToast, Toast } from "@raycast/api";
import { encodeURL } from "./actions";
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
      const encodedResult = encodeURL(text);

      if ("error" in encodedResult) {
        setError(encodedResult.error.message);
        return;
      }

      setResult(encodedResult.value);
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
      navigationTitle="URL Encoded"
      markdown={markdown(result)}
      actions={
        <ActionPanel>
          <Action
            title="Copy Encoded URL"
            onAction={async () => {
              await Clipboard.copy(result);
              await closeMainWindow();
              await showHUD("Copied to clipboard");
            }}
          />
        </ActionPanel>
      }
    />
  );
}