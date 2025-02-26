import React, { useEffect, useState } from "react";
import { Action, ActionPanel, Clipboard, Detail, showToast, Toast } from "@raycast/api";
import { base64Encode } from "./actions";
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
      const encodedResult = base64Encode(text);

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
      navigationTitle="Base64 Encoded"
      markdown={markdown(result)}
      actions={
        <ActionPanel>
          <Action
            title="Copy Encoded Text"
            onAction={async () => {
              await Clipboard.copy(result);
              await showToast({
                style: Toast.Style.Success,
                title: "Encoded text copied to clipboard"
              });
            }}
          />
          {original && (
            <Action
              title="Copy Original Text"
              onAction={async () => {
                await Clipboard.copy(original);
                await showToast({
                  style: Toast.Style.Success,
                  title: "Original text copied to clipboard"
                });
              }}
            />
          )}
        </ActionPanel>
      }
    />
  );
}