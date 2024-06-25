import { Action, ActionPanel, Form } from "@raycast/api";
import { useState } from "react";
import type { ActionResult, ActionRun } from "../types";
import { isFailure, isSuccess, readFromClipboardSync } from "../utils";

export default ({ title, action }: { title: string; action: ActionRun }) => {
  const [result, setResult] = useState<ActionResult>({ value: "", type: "string" });

  return (
    <Form
      actions={
        <ActionPanel>
          {isSuccess(result) && (
            <Action.CopyToClipboard content={result.value} />
          )}
        </ActionPanel>
      }
    >
      <Form.TextArea
        autoFocus={false}
        id="input"
        title="Input"
        placeholder="Input..."
        defaultValue={readFromClipboardSync()}
        onChange={(value) => {
          setResult(action(value));
        }}
      />
      <Form.Description
        title="Output"
        text={isFailure(result) ? result.error.message : result?.value}
      />
    </Form>
  );
};
