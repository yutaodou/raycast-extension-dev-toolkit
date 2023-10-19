import { decodeURL, encodeURL } from "../src/actions";
import { Failure, Success } from "../src/types";
describe("actions", () => {
  describe("URL", () => {
    it("should encode URL", () => {
      let actual = encodeURL("http://www.baidu.com?query=hello world") as Success;
      expect(actual.value).toEqual("http://www.baidu.com/?query=hello%20world");

      actual = encodeURL("http://www.baidu.com?redirectUrl=https://www.bing.com:8080") as Success;
      expect(actual.value).toEqual("http://www.baidu.com/?redirectUrl=https%3A%2F%2Fwww.bing.com%3A8080");
    });

    it("should decode encoded URL", () => {
      let actual = decodeURL("http://www.baidu.com?query=hello%20world") as Success;
      expect(actual.value).toEqual("http://www.baidu.com/?query=hello world");

      actual = decodeURL("http://www.baidu.com?redirectUrl=https%3A%2F%2Fwww.bing.com%3A8080") as Success;
      expect(actual.value).toEqual("http://www.baidu.com/?redirectUrl=https://www.bing.com:8080");
    });

    it("should raise error if invalid URL given", () => {
      const result = decodeURL("http://www.baidu.com?query=20%") as Failure;
      expect(result.error?.message).toEqual("Invalid URL");
    });
  });
});
