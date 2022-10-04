import { Action, ActionPanel, Detail, showHUD } from "@raycast/api";
import { ActionResult } from "./actions";
import { readFromClipboardSync } from "./utils";

export type Action = (input: string) => ActionResult;

export default ({ title, action }: { title: string; action: Action }) => {
  console.log(`rendering ${title}`);

  return (
    <ActionPanel>
      <Action.Push
        title={title}
        target={<DetailView title={title} action={action} />}
      />
    </ActionPanel>
  );
};

const DetailView = ({ action, title }: { action: Action; title: string }) => {
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
