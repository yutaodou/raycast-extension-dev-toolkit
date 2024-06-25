import { List } from "@raycast/api";
import ClipboardAction from "./ClipboardAction";
import {
  base64Decode,
  base64Encode,
  decodeJWT,
  decodeURL,
  encodeURL,
  generateUUID,
  localDateISO8601,
  localTimestamp,
  localTimestampInMilliseconds,
  minifyJSON,
  prettifyJSON,
  timestampMillisecondToDateString,
  timestampSecondsToDateString,
} from "./actions";

export default function Command() {
  return (
    <List>
      <List.Section title="Encode/Decode">
        <List.Item
          key="base64Encode"
          icon="list-icon.png"
          title="Base64 Encode"
          subtitle="Base64 encode text from clipboard"
          actions={
            <ClipboardAction title="Base64 Encode" action={base64Encode} />
          }
        />
        <List.Item
          key="base64Decode"
          icon="list-icon.png"
          title="Base64 Decode"
          subtitle="Base64 decode text from clipboard"
          actions={
            <ClipboardAction title="Base64 Decode" action={base64Decode} />
          }
        />
        <List.Item
          key="urlEncode"
          icon="list-icon.png"
          title="URL Encode"
          subtitle="URL encode text from clipboard"
          actions={<ClipboardAction title="URL Encode" action={encodeURL} />}
        />
        <List.Item
          key="urlDecode"
          icon="list-icon.png"
          title="URL Decode"
          subtitle="URL decode text from clipboard"
          actions={<ClipboardAction title="URL Decode" action={decodeURL} />}
        />
        <List.Item
          key="jwtDecode"
          icon="list-icon.png"
          title="JWT Decode"
          subtitle="Decode JWT token from clipboard"
          actions={<ClipboardAction title="JWT Decode" action={decodeJWT} />}
        />
      </List.Section>

      <List.Section title="Date">
        <List.Item
          key="timestampInSeconds"
          icon="list-icon.png"
          title="Timestamp"
          subtitle="Return the timestamp in seconds since the epoch "
          actions={
            <ClipboardAction title="Timestamp" action={localTimestamp} />
          }
        />
        <List.Item
          key="localTimestampInMilliseconds"
          icon="list-icon.png"
          title="Timestamp in milliseconds"
          subtitle="Return the timestamp in milliseconds since the epoch"
          actions={
            <ClipboardAction
              title="Timestamp in milliseconds"
              action={localTimestampInMilliseconds}
            />
          }
        />
        <List.Item
          key="localDateISO8601"
          icon="list-icon.png"
          title="Local Date"
          subtitle="Return local date in ISO8601 format"
          actions={
            <ClipboardAction title="Local Date" action={localDateISO8601} />
          }
        />
        <List.Item
          key="timestampToDateString"
          icon="list-icon.png"
          title="Timestamp(second) to Date"
          subtitle="Convert timestamp in second to date and return in ISO8601 format"
          actions={
            <ClipboardAction
              title="Timestamp(second) to Date"
              action={timestampSecondsToDateString}
            />
          }
        />
        <List.Item
          key="timestampMillisecondToDateString"
          icon="list-icon.png"
          title="Timestamp(millisecond) to Date"
          subtitle="Convert timestamp in millisecond in second to date and return in ISO8601 format"
          actions={
            <ClipboardAction
              title="Timestamp(millisecond) to Date"
              action={timestampMillisecondToDateString}
            />
          }
        />
      </List.Section>
      <List.Section title="Format">
        <List.Item
          key="prettifyJSON"
          icon="list-icon.png"
          title="Prettify JSON"
          subtitle="Prettify JSON text from clipboard"
          actions={
            <ClipboardAction title="Prettify JSON" action={prettifyJSON} />
          }
        />
        <List.Item
          key="minifyJSON"
          icon="list-icon.png"
          title="Minify JSON"
          subtitle="Minify JSON text from clipboard"
          actions={<ClipboardAction title="Minify JSON" action={minifyJSON} />}
        />
      </List.Section>
      <List.Item
        key="generateUUID"
        icon="list-icon.png"
        title="UUID"
        subtitle="Generate UUID"
        actions={<ClipboardAction title="UUID" action={generateUUID} />}
      />
    </List>
  );
}
