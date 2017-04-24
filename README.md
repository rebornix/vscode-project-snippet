# project snippets 

Provide workspace/project level code snippets.

![screenshot](images/screenshot.png)

## Usage

Put snippets at `.vscode/snippets/<languageId>.json`

For example, `.vscode/snippets/javascript.json`

```json
{
  // Place your snippets for JavaScript here. Each snippet is defined under a snippet name and has a prefix, body and 
  // description. The prefix is what is used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
  // $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. Placeholders with the 
  // same ids are connected.
  // Example:
  "Print to console": {
    "prefix": "log",
    "body": [
      "console.log($1);"
    ],
    "description": "Log output to console"
  },
  "Print to console error": {
    "prefix": "error",
    "body": [
      "console.error($1);"
    ],
    "description": "Log error output to console"
  },
}
```

See <a href="https://medium.com/hack-visual-studio-code/share-snippets-with-your-team-in-vs-code-817801e853fb">this blog post</a> for more info.

## Credits
<div>Icons made by <a href="http://www.flaticon.com/authors/maxim-basinski" title="Maxim Basinski">Maxim Basinski</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>