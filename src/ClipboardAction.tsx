import {
  ActionPanel,
  CopyToClipboardAction,
  Detail,
  PushAction,
  showHUD,
} from "@raycast/api";
import { useEffect, useState } from "react";
import { ActionResult } from "./actions";
import { readFromClipboard } from "./utils";

export type ClipboardActionType = (input: string) => ActionResult;

export default ({
  title,
  action,
}: {
  title: string;
  action: ClipboardActionType;
}) => {
  return (
    <ActionPanel>
      <PushAction
        title={title}
        target={<ActionResultView title={title} action={action} />}
      />
    </ActionPanel>
  );
};

const ActionResultView = ({
  action,
  title,
}: {
  action: ClipboardActionType;
  title: string;
}) => {
  const [result, setResult] = useState<ActionResult>({ value: "" });

  useEffect(() => {
    performAction();
  }, []);

  const performAction = async () => {
    const input = await readFromClipboard();
    if (!input) {
      setResult({ error: Error("Empty clipboard") });
      return;
    }
    const result = action(input);
    setResult(result);

    console.log(result);
    if (result?.error) {
      await showHUD(result?.error.message);
      return null;
    }
  };

  const actions = (
    <ActionPanel>
      <CopyToClipboardAction content={result?.value || ""} />
    </ActionPanel>
  );

  return (
    <Detail
      navigationTitle={title}
      markdown={result?.value || ""}
      actions={actions}
    />
  );
};
