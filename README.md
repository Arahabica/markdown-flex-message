<p align="center">
  <img width="180" src="https://raw.githubusercontent.com/Arahabica/larkdown/main/docs/images/larkdown.png" alt="Larkdown logo">
</p>

# Larkdown [![npm version](https://badge.fury.io/js/@arahabica%2Flarkdown.svg)](https://badge.fury.io/js/@arahabica%2Flarkdown) [![test](https://github.com/Arahabica/larkdown/actions/workflows/test.yml/badge.svg)](https://github.com/Arahabica/larkdown/actions/workflows/test.yml) [![codecov](https://codecov.io/gh/Arahabica/larkdown/graph/badge.svg?token=ICO1VHV32M)](https://codecov.io/gh/Arahabica/larkdown)

Larkdown is a converter that transforms Markdown into Flex Message for the LINE Messaging API.

## Installation

```:sh
npm install larkdown
```

## Usage

```js
import { convertToFlexMessage } from "@arahabica/larkdown"

const markdownText = `
# Larkdown
Hello Larkdown.
`.trim()

convertToFlexMessage(markdown)
  .then((result) => {
    console.log(JSON.stringify(result, null, 2))
  })
```

## License

[MIT](http://opensource.org/licenses/MIT)
