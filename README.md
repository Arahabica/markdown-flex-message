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

## License

[MIT](http://opensource.org/licenses/MIT)
