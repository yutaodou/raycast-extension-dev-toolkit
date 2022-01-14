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
            <PushAction title={title} target={<ActionResultView action={action} />} />
        </ActionPanel>
    );
};

const ActionResultView = ({ action }: { action: ClipboardActionType }) => {
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

    return <Detail markdown={result?.value || ""} actions={actions} />;
};
