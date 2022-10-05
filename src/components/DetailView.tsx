import { Action, ActionPanel, Detail, showHUD } from "@raycast/api";
import { ActionResult } from "../actions";
import { readFromClipboardSync } from "../utils";

import { ActionRun } from "../types";

type DetailViewProps = {
  action: ActionRun;
  title: string;
};

export default ({ action, title }: DetailViewProps) => {
  const process = (): ActionResult => {
    const clipboard = readFromClipboardSync();
    return action(clipboard);
  };

  const handleError = async (result: ActionResult) => {
    if (!result?.error) {
      return;
    }

    await showHUD(result.error.message);
  };

  const result = process();

  const content = result.error?.message ?? (result.value || "");
  return (
    <Detail
      navigationTitle={title}
      markdown={content}
      actions={
        <ActionPanel>
          {!result?.error && <Action.CopyToClipboard content={content} />}

          {result?.error && (
            <Action title={title} onAction={() => handleError(result)} />
          )}
        </ActionPanel>
      }
    />
  );
};
