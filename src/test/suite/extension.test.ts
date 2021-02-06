//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//
import * as packageJSON from "../../../package.json";
// The module 'assert' provides assertion methods from node
import * as assert from "assert";

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import { swapText as swapTextUncurried } from "../../utils";
const swapText = (v: string) =>
  swapTextUncurried(
    v,
    packageJSON.contributes.configuration.properties["toggleboolean.mapping"]
  );
suite("swapText", () => {
  test("should swap vanilla individual worlds", () => {
    assert.strictEqual(swapText("False"), "True");
    assert.strictEqual(swapText("True"), "False");
    assert.strictEqual(swapText("FALSE"), "TRUE");
    assert.strictEqual(swapText("TRUE"), "FALSE");
    assert.strictEqual(swapText("false"), "true");
    assert.strictEqual(swapText("0"), "1");
    assert.strictEqual(swapText("1"), "0");
  });
  test("should work with blobs of text", () => {
    assert.strictEqual(
      swapText("TRUE\nFALSE\nfoobarbazTrue\nFalse"),
      "FALSE\nTRUE\nfoobarbazFalse\nTrue"
    );
  });
});
