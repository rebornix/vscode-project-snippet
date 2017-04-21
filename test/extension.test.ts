import * as assert from 'assert';

import { parseSnippetFile } from '../src/extension';

suite("parseSnippetFile", () => {
    test("parse content with tab indent", () => {
        const content = `
        {
        \t"Print to console": {
        \t\t"prefix": "log",
                "body": [
                    "console.log($1);"
                ],
                "description": "Log output to console"
            },
        }
        `;

        const actual = parseSnippetFile(content);
        assert.equal(1, actual.length);
    });

    test("parse content with tab inside the string", () => {
        const content = `
        {
            "Print\tto\tconsole": {
                "prefix": "log",
                "body": [
                    "console.log($1);"
                ],
                "description": "Log\toutput\tto\tconsole"
            },
        }
        `;

        const actual = parseSnippetFile(content);
        assert.equal(1, actual.length);
    });
});