import { Action, ActionPanel, Detail, showHUD } from "@raycast/api";
import { ActionResult, ActionRun } from "../types";
import { isFailure, isSuccess, readFromClipboardSync } from "../utils";

type DetailViewProps = {
  action: ActionRun;
  title: string;
};

export default ({ action, title }: DetailViewProps) => {
  const process = (): ActionResult => {
    const clipboard = readFromClipboardSync();
    return action(clipboard);
  };

  const result = process();
  const content = isSuccess(result) ? result.value : "";

  return (
    <Detail
      navigationTitle={title}
      markdown={content}
      actions={
        <ActionPanel>
          {isSuccess(result) && <Action.CopyToClipboard content={result.value} />}

          {isFailure(result) && (
            <Action title={title} onAction={async () => await showHUD(result.error.message)} />
          )}
        </ActionPanel>
      }
    />
  );
};
