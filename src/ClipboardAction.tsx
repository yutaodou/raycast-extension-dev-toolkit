import { Action, ActionPanel } from "@raycast/api"

import { ActionRun } from "./types"

import { DetailView } from "./components"

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
