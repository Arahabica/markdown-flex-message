<p align="center">
  <img width="180" src="https://raw.githubusercontent.com/Arahabica/larkdown/main/docs/images/larkdown.png" alt="Larkdown logo">
</p>
<p align="center">
  <a href="https://badge.fury.io/js/@arahabica%2Flarkdown" rel="nofollow"><img src="https://badge.fury.io/js/@arahabica%2Flarkdown.svg" alt="npm version"></a>
  <a href="https://github.com/Arahabica/larkdown/actions/workflows/test.yml"><img src="https://github.com/Arahabica/larkdown/actions/workflows/test.yml/badge.svg" alt="test"></a>
  <a href="https://codecov.io/gh/Arahabica/larkdown" rel="nofollow"><img src="https://codecov.io/gh/Arahabica/larkdown/graph/badge.svg?token=ICO1VHV32M" alt="codecov""></a>
</p>

# Larkdown

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
