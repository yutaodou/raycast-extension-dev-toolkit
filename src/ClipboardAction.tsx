import { Action, ActionPanel, Detail, showHUD } from "@raycast/api";
import { ActionResult } from "./actions";
import { readFromClipboardSync } from "./utils";

import { ActionRun } from "./types";

export default ({ title, action }: { title: string; action: ActionRun }) => {
  return (
    <ActionPanel>
      <Action.Push
        title={title}
        target={<DetailView title={title} action={action} />}
      />
    </ActionPanel>
  );
};

type DetailViewProps = {
  action: ActionRun;
  title: string;
};

const DetailView = ({ action, title }: DetailViewProps) => {
  const process = (): ActionResult => {
    const clipboard = readFromClipboardSync();
    const result = clipboard
      ? action(clipboard)
      : { error: Error("Empty clipboard") };
    return result;
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
