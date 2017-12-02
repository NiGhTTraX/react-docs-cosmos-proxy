react-docs-cosmos-proxy
======

[![Build Status](https://travis-ci.org/NiGhTTraX/react-docs-cosmos-proxy.svg?branch=master)](https://travis-ci.org/NiGhTTraX/react-cosmos-docs-proxy)

----

![react-cosmos](./tests/acceptance/screenshots/chrome/acceptance_one-prop&#32;base.png)

A [react-cosmos](https://github.com/react-cosmos/react-cosmos) plugin to show
component documentation generated using
[react-docgen](https://github.com/reactjs/react-docgen).


## Usage

Follow the [react-cosmos](https://github.com/react-cosmos/react-cosmos#getting-started)
instructions before setting this up.

The recommended way to get the component docs is to use
[babel-plugin-react-docgen](https://github.com/storybooks/babel-plugin-react-docgen)
and include it in your `.babelrc`:

```
{
  plugins: ['react-docgen']
}
```

Then just add the proxy to `cosmos.proxies.js`:

```js
import createDocsProxy from 'react-cosmos-docs-proxy';

export default [
  createDocsProxy()
];
```
