# :rotating_light: Deprecated :rotating_light: - This feature is now part of VSCode
[This feature](https://github.com/Microsoft/vscode/issues/8102) now ships with visual studio code!

Steps to using built-in workspace snippets:
- Create a `{namehere}.code-snippets` file in `.vscode` folder
- The file must be within `.vscode` folder (not in sub-folders)
- Your snippets can now be checked in and shared with your team
- Note: when using the snippet you will see `(Workspace Snippet)` in the intellisense autocomplete dropdown


--------

# project snippets [![Build Status](https://travis-ci.org/rebornix/vscode-project-snippet.svg?branch=master)](https://travis-ci.org/rebornix/vscode-project-snippet) [![Build status](https://ci.appveyor.com/api/projects/status/0ntf4072cfp2naig/branch/master?svg=true)](https://ci.appveyor.com/project/rebornix/vscode-project-snippet/branch/master)


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

## Contributors
* rebornix
* [thongdong7](https://github.com/thongdong7)

## Credits
<div>Icons made by <a href="http://www.flaticon.com/authors/maxim-basinski" title="Maxim Basinski">Maxim Basinski</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
