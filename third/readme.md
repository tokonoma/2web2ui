# Third Party Source Code

Do not add to this directory.  This is temporary and deserves a more permanent solution.

## Background

The browser version of Google's AMP Linter, [amp-validator](https://github.com/ampproject/amphtml/tree/master/validator), is not published on
NPM.  The idea has been proposed, https://github.com/ampproject/amphtml/issues/2498.  The built file is only accessible via CDN, https://cdn.ampproject.org/v0/validator.js which is not versioned.  To provide a consistent and reliable experience for our customers, this built file needs to be included in our bundle.


To download latest version, run and commit:

```bash
$ curl -o third/ampValidator/validator.js https://cdn.ampproject.org/v0/validator.js
```
