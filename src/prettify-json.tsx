import { Action, ActionPanel, Clipboard, Detail, showToast } from "@raycast/api";
import { useEffect, useState } from "react";
import { prettifyJSON } from "./actions";
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
      const prettifiedResult = prettifyJSON(text);

      if ("error" in prettifiedResult) {
        setError(prettifiedResult.error.message);
        return;
      }

      setResult(prettifiedResult.value);
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
      navigationTitle="Prettified JSON"
      markdown={markdown(result)}
      actions={
        <ActionPanel>
          <Action
            title="Copy Prettified JSON"
            onAction={() => {
              Clipboard.copy(result);
              await showToast({
                style: Toast.Style.Success,
                title: "Prettified JSON copied to clipboard",
              });
            }}
          />
          {original && (
            <Action
              title="Copy Original JSON"
              onAction={() => {
                Clipboard.copy(original);
                await showToast({
                  style: Toast.Style.Success,
                  title: "Original JSON copied to clipboard",
                });
              }}
            />
          )}
        </ActionPanel>
      }
    />
  );
}