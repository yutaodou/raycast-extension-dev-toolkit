import { List } from "@raycast/api";
import { base64Decode, base64Encode } from "./actions";
import ClipboardAction from "./ClipboardAction";

export default function Command() {
  return (
    <List>
      <List.Item
        key="1"
        icon="list-icon.png"
        title="Base64 Encode"
        actions={<ClipboardAction title="Encoded" action={base64Encode} />}
      />
      <List.Item
        key="2"
        icon="list-icon.png"
        title="Base64 Decode"
        actions={<ClipboardAction title="Decoded" action={base64Decode} />}
      />
    </List>
  );
}
