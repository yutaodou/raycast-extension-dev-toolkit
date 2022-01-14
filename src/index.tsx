import { List } from "@raycast/api";
import { base64Decode, base64Encode, localDateISO8601, localTimestamp, timestamp } from "./actions";
import ClipboardAction from "./ClipboardAction";

export default function Command() {
  return (
    <List>
      <List.Section title="Encode/Decode">
        <List.Item
          key="1"
          icon="list-icon.png"
          title="Base64 Encode"
          subtitle="Base64 encode text from clipboard"
          actions={<ClipboardAction title="Encoded" action={base64Encode} />}
        />
        <List.Item
          key="2"
          icon="list-icon.png"
          title="Base64 Decode"
          subtitle="Base64 decode text from clipboard"
          actions={<ClipboardAction title="Decoded" action={base64Decode} />}
        />
      </List.Section>

      <List.Section title="Date">
        <List.Item
          key="3"
          icon="list-icon.png"
          title="Timestamp"
          subtitle="Return the time in seconds since the epoch as a floating point number. "
          actions={<ClipboardAction title="Timestamp" action={localTimestamp} />}
        />
        <List.Item
          key="3"
          icon="list-icon.png"
          title="Local Datetime"
          subtitle="Return local datetime in ISO8601 format"
          actions={<ClipboardAction title="Timestamp" action={localDateISO8601} />}
        />
      </List.Section>
    </List>
  );
}
