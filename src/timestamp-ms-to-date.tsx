import { Action, ActionPanel, Clipboard, Detail, showToast } from "@raycast/api";
import { useEffect, useState } from "react";
import { timestampMillisecondToDateString } from "./actions";
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

      const convertedResult = timestampMillisecondToDateString(text);

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
      navigationTitle="Timestamp (ms) to Date"
      markdown={markdown(result)}
      actions={
        <ActionPanel>
          <Action
            title="Copy Converted Date"
            onAction={() => {
              Clipboard.copy(result);
              await showToast({
                style: Toast.Style.Success,
                title: "Converted date copied to clipboard",
              });
            }}
          />
        </ActionPanel>
      }
    />
  );
}