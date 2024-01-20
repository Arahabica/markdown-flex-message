[![codecov](https://codecov.io/gh/Arahabica/larkdown/graph/badge.svg?token=ICO1VHV32M)](https://codecov.io/gh/Arahabica/larkdown)

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
