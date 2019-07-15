<p align="center">
 <img src="https://avatars2.githubusercontent.com/u/46743732?s=200&v=4" alt="Qantas Runway"></a>
</p>

<h3 align="center">Qantas Runway</h3>

<div align="center">

  [![CircleCI](https://circleci.com/gh/qantasairways/runway.svg?style=svg)](https://circleci.com/gh/qantasairways/runway)
  [![GitHub Issues](https://img.shields.io/github/issues/qantasairways/runway.svg)](https://github.com/qantasairways/runway/issues)
  [![GitHub Pull Requests](https://img.shields.io/github/issues-pr/qantasairways/runway.svg)](https://github.com/qantasairways/runway/pulls)
  [![NPM](https://img.shields.io/npm/l/@qantasairways/runway.svg)]()
  [![npm](https://img.shields.io/npm/dw/@qantasairways/runway.svg)](https://www.npmjs.com/package/@qantasairways/runway)
  [![npm (tag)](https://img.shields.io/npm/v/@qantasairways/runway/latest.svg)](https://www.npmjs.com/package/@qantasairways/runway)

</div>

---

<p align = "center">💅 Runway, Qantas' living, breathing style guide. Powered by React and Emotion built to be extendable,
flexible and accessible components.</p>

> [Demo](https://desolate-ravine-84627.herokuapp.com)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)


## Installation <a name = "installation"></a>

This module is distributed via [npm](https://www.npmjs.com) which is bundled with [node](https://nodejs.org) and
should be installed as one of your project's `dependencies`:

```
npm install --save @qantasairways/runway
```

> This package depends on `emotion`, `react`, `prop-types`. The project supports aliasing `preact`, which
> is how we use runway at Qantas.

## Usage <a name="usage"></a>

> [Try it out in the browser](https://codesandbox.io/s/09rw5)

```jsx
import React from "react";
import { render } from "react-dom";
import { Button } from "@qantasairways/runway";

render(<Button label="Click me" />, document.getElementById("root"));
```

## Contributing <a name="contributing"></a>

Please read our contributing guidelines <a href="https://github.com/qantasairways/runway/blob/master/CONTRIBUTING.md">here</a>.

## License <a name="license"></a>

MIT
