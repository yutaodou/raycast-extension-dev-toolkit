import { List } from "@raycast/api"
import { base64Decode, base64Encode, localDateISO8601, localTimestamp, timestampToDateString } from "./actions"
import ClipboardAction from "./ClipboardAction"

export default function Command() {
  return (
    <List>
      <List.Section title="Encode/Decode">
        <List.Item
          key="1"
          icon="list-icon.png"
          title="Base64 Encode"
          subtitle="Base64 encode text from clipboard"
          actions={<ClipboardAction title="Base64 Encoded" action={base64Encode} />}
        />
        <List.Item
          key="2"
          icon="list-icon.png"
          title="Base64 Decode"
          subtitle="Base64 decode text from clipboard"
          actions={<ClipboardAction title="Base64 Decoded" action={base64Decode} />}
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
          key="4"
          icon="list-icon.png"
          title="Local Date"
          subtitle="Return local date in ISO8601 format"
          actions={<ClipboardAction title="Local Date" action={localDateISO8601} />}
        />
        <List.Item
          key="5"
          icon="list-icon.png"
          title="Timestamp to Date"
          subtitle="Convert timestam to date and return in ISO8601 format"
          actions={<ClipboardAction title="Timestamp to Date" action={timestampToDateString} />}
        />
      </List.Section>
    </List>
  );
}
