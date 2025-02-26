import React, { useEffect, useState } from "react";
import { Action, ActionPanel, Clipboard, Detail, showToast } from "@raycast/api";
import { decodeURL } from "./actions";
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
      const decodedResult = decodeURL(text);

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
      navigationTitle="URL Decoded"
      markdown={markdown(result)}
      actions={
        <ActionPanel>
          <Action
            title="Copy Decoded URL"
            onAction={() => {
              Clipboard.copy(result);
              await showToast({
                style: Toast.Style.Success,
                title: "Decoded URL copied to clipboard"
              });
            }}
          />
        </ActionPanel>
      }
    />
  );
}