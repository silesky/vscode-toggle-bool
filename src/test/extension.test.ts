//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import * as myExtension from '../extension';
import { swapText } from '../utils';
suite('swapText', () => {
  test('should swap vanilla individual worlds', () => {
    assert.equal(swapText('False'), 'True');
    assert.equal(swapText('True'), 'False');
    assert.equal(swapText('FALSE'), 'TRUE');
    assert.equal(swapText('TRUE'), 'FALSE');
    assert.equal(swapText('false'), 'true');
    assert.equal(swapText('0'), '1');
    assert.equal(swapText('1'), '0');
  });
  test('should work with blobs of text', () => {
    assert.equal(
      swapText('TRUE\nFALSE\nfoobarbazTrue\nFalse'),
      'FALSE\nTRUE\nfoobarbazFalse\nTrue',
    );
  });
});
