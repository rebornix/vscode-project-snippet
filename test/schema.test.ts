import * as assert from 'assert';

import * as JSON5 from 'json5';
import * as fs from 'fs'

suite("Snippet Schema", () => {
  test("load snippet schema without error", () => {
    // This test is to ensure that there is no accidently changing in the snippet schema file which make it broken.
    const content = fs.readFileSync(__dirname + '/../../snippet.json');
    const actual = JSON5.parse(content);
    
    assert.ok(typeof actual === 'object');
  });
});