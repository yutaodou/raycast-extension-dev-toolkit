import { Action, ActionPanel, Form } from "@raycast/api";
import { useState } from "react";
import { ActionResult, ActionRun } from "../types";
import { readFromClipboardSync } from "../utils";

export default ({ title, action }: { title: string; action: ActionRun }) => {
  const [result, setResult] = useState<ActionResult>({ value: "" });

  return (
    <Form
      actions={
        <ActionPanel>
          {!result?.error && (
            <Action.CopyToClipboard content={result?.value ?? ""} />
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
        text={result?.error?.message ?? result?.value ?? ""}
      />
    </Form>
  );
};
