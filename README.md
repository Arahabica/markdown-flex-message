<p align="center">
  <img width="180" src="https://raw.githubusercontent.com/Arahabica/line-markdown/main/docs/images/line-markdown.png" alt="line-markdown logo">
</p>
<p align="center">
  <a href="https://badge.fury.io/js/line-markdown" rel="nofollow"><img src="https://badge.fury.io/js/line-markdown.svg" alt="npm version"></a>
  <a href="https://github.com/Arahabica/line-markdown/actions/workflows/test.yml"><img src="https://github.com/Arahabica/line-markdown/actions/workflows/test.yml/badge.svg" alt="test"></a>
  <a href="https://codecov.io/gh/Arahabica/line-markdown" rel="nofollow"><img src="https://codecov.io/gh/Arahabica/line-markdown/graph/badge.svg?token=ICO1VHV32M" alt="codecov""></a>
</p>

# line-markdown

line-markdown is a converter that transforms Markdown into Flex Message for the LINE Messaging API.

## Installation

```bash
npm install line-markdown --save
```

## Usage

### Basic usage

Convert the markdown to a Flex Message.

#### Code

```js
import { convertToFlexMessage } from 'line-markdown'
import * as line from '@line/bot-sdk'

const markdownText = `
# Fluits
* apple
* banana
* cherry
`.trim()

convertToFlexMessage(markdownText)
  .then(({ flexMessage }) => {
    const client = new line.messagingApi.MessagingApiClient({
      channelAccessToken: '{{YOUR_CHANNEL_ACCESS_TOKEN}}'
    })
    return client.pushMessage({
      to: '{{YOUR_USER_ID}}',
      messages: [flexMessage]
    })
  })
  .then(() => {
    console.log('sent.')
  })
```

#### Result

**Talk List Screen**
The alternative text is set to `markdown` by default, so the talk list screen will show `markdown`.

![Example1 Alt](https://raw.githubusercontent.com/Arahabica/line-markdown/main/docs/images/example1_alt.jpg)

**Talk Screen**
The size of the Flex message bubble is set to `giga` by default.

![Example1 Flex](https://raw.githubusercontent.com/Arahabica/line-markdown/main/docs/images/example1_flex.jpg)

## License

[MIT](http://opensource.org/licenses/MIT)
