import React, { useEffect, useState } from "react";
import { Action, ActionPanel, Clipboard, Detail, showToast, Toast, popToRoot, closeMainWindow, showHUD } from "@raycast/api";
import { minifyJSON } from "./actions";
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
      const minifiedResult = minifyJSON(text);

      if ("error" in minifiedResult) {
        setError(minifiedResult.error.message);
        return;
      }

      setResult(minifiedResult.value);
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
      navigationTitle="Minified JSON"
      markdown={markdown(result)}
      actions={
        <ActionPanel>
          <Action
            title="Copy Minified JSON"
            onAction={async () => {
              await Clipboard.copy(result);
              await closeMainWindow();
              await showHUD("Minified JSON copied to clipboard");
            }}
          />
          {original && (
            <Action
              title="Copy Original JSON"
              onAction={async () => {
                await Clipboard.copy(original);
                await closeMainWindow();
                await showHUD("Original JSON copied to clipboard");
              }}
            />
          )}
        </ActionPanel>
      }
    />
  );
}