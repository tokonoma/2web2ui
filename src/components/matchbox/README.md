# Matchbox Component Wrappers

Components in this folder are wrappers for [Matchbox](https://design.sparkpost.com/) components in
order to:

1. Provide a single point of entry for Matchbox dependencies
2. Provide Hibana context to each Matchbox component for theme switching

## Conditionally Rendering Hibana Components

Render Hibana vs. default Matchbox components using the
[`useHibana` hook](https://github.com/SparkPost/2web2ui/wiki/Hibana) which accesses the user's
Hibana theme context:

```js
import React from 'react';
import { ProgressBar as OGProgressBar } from '@sparkpost/matchbox';
import { ProgressBar as HibanaProgressBar } from '@sparkpost/matchbox-hibana';
import { useHibana } from 'src/context/HibanaContext';
import { omit } from './omit'; // WIP: This is conceptual at this point in time.

export default function ProgressBar(props) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  if (!isHibanaEnabled) {
    return <OGProgressBar {...omit(props)} />;
  }

  return <HibanaProgressBar {...props}>
}
```

The custom `omit` function is used to prevent certain props from rendering to the DOM
unintentionally, first removing styled system props via the `@styled-system/props` package
([See the repo on GitHub](https://github.com/styled-system/styled-system/tree/master/packages/props)).
For props that need to be passed and would also be ommitted by this package, props continue to be
passed as expected.

## Using the Component

In the app, instead of importing directly from `@sparkpost/matchbox`, import from
`src/components/matchbox`:

```js
import React from 'react';
import { ProgressBar } from 'src/components/matchbox';

function MyComponent() {
  return (
    <div>
      <h1>My Component!</h1>

      <ProgressBar mt="100" />
    </div>
  );
}
```

In this scenario, the `mb` prop will be passed to the component only when the Hibana theme is
enabled. When disabled, the new [Styled System](https://styled-system.com/) props are not passed.
