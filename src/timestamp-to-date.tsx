import React, { useEffect, useState } from "react";
import { Action, ActionPanel, Clipboard, Detail } from "@raycast/api";
import { timestampSecondsToDateString } from "./actions";
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
      const convertedResult = timestampSecondsToDateString(text);

      if ("error" in convertedResult) {
        setError(convertedResult.error.message);
        return;
      }

      setResult(convertedResult.value);
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
      navigationTitle="Timestamp to Date"
      markdown={markdown(result)}
      actions={
        <ActionPanel>
          <Action
            title="Copy Converted Date"
            onAction={() => Clipboard.copy(result)}
          />
          {original && (
            <Action
              title="Copy Original Timestamp"
              onAction={() => Clipboard.copy(original)}
            />
          )}
        </ActionPanel>
      }
    />
  );
}