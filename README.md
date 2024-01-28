<p align="center">
  <img width="180" src="docs/images/line-markdown.png" alt="line-markdown logo">
</p>
<p align="center">
  <a href="https://badge.fury.io/js/line-markdown" rel="nofollow"><img src="https://badge.fury.io/js/line-markdown.svg" alt="npm version"></a>
  <a href="https://github.com/Arahabica/line-markdown/actions/workflows/test.yml"><img src="https://github.com/Arahabica/line-markdown/actions/workflows/test.yml/badge.svg" alt="test"></a>
  <a href="https://codecov.io/gh/Arahabica/line-markdown" rel="nofollow"><img src="https://codecov.io/gh/Arahabica/line-markdown/graph/badge.svg?token=ICO1VHV32M" alt="codecov""></a>
</p>

# line-markdown

line-markdown is a converter that transforms Markdown into Flex Message for the LINE Messaging API.

# Installation

```bash
npm install line-markdown --save
```

# Usage

## Basic usage

Convert the markdown to a Flex Message.

### Code

```js
import { convertToFlexMessage } from 'line-markdown'
import * as line from '@line/bot-sdk'

const markdownText = `
# Fruits
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

### Result

#### Talk List Screen

The default alternative text is `markdown`, so the talk list screen will display `markdown`.

![Example1 Alt](docs/images/example1_alt.jpg)

#### Talk Screen

The default size of the Flex message bubble is `giga`.

![Example1 Flex](docs/images/example1_flex.jpg)

## Custom Alternative text

To set custom alternative text and set the bubble size to mega, use the following code.

### Code

```typescript
import { convertToFlexMessage } from 'line-markdown'
import * as line from '@line/bot-sdk'

const markdownText = `
# Fruits
* apple
* banana
* cherry
`.trim()

convertToFlexMessage(markdownText, 'Fruits', { size: 'mega' })
  .then(({ flexMessage }) => {
    const client = new line.messagingApi.MessagingApiClient({
      channelAccessToken: '{{YOUR_CHANNEL_ACCESS_TOKEN}}'
    })
    return client.pushMessage({
      to: '{{YOUR_USER_ID}}',
      messages: [flexMessage]
    })
  })

```

### Result

#### Talk List Screen

The alternative text is `Fruits`.

![Example2 Alt](docs/images/example2_alt.jpg)

#### Talk Screen

The size of the Flex message bubble is set to `mega`.

![Example2 Flex](docs/images/example2_flex.jpg)

## Code Display

`line-markdown` also supports the display of code.

### Code

```typescript
import { convertToFlexMessage } from 'line-markdown'
import * as line from '@line/bot-sdk'

const markdownText =
  [
    '```typescript                                 ',
    'const add = (a:number, b:number): number => { ',
    '  return a + b                                ',
    '}                                             ',
    '```                                           '
  ].join("\n")

convertToFlexMessage(markdownText, 'Typescript sample')
  .then(({ flexMessage, textType }) => {
    console.log(textType) // => "code"
    const client = new line.messagingApi.MessagingApiClient({
      channelAccessToken: '{{YOUR_CHANNEL_ACCESS_TOKEN}}'
    })
    return client.pushMessage({
      to: '{{YOUR_USER_ID}}',
      messages: [flexMessage]
    })
  })
```

### Result

#### Talk List Screen

![Example3 Alt](docs/images/example3_alt.jpg)

#### Talk Screen

![Example3 Flex](docs/images/example3_flex.jpg)

## Flex Bubble

You can convert Markdown into a Flex Bubble, which allows you to use Markdown as part of a carousel

### Code

```typescript
import { convertToFlexBubble } from 'line-markdown'
import * as line from '@line/bot-sdk'

const markdownText = `
# Fruits
* apple
* banana
* cherry
`.trim()
convertToFlexBubble(markdownText, { size: 'micro' })
  .then(({ flexBubble }) => {
    const message = {
      type: "flex",
      altText: 'Fruits',
      contents: {
        type: 'carousel',
        contents: [
          flexBubble,
          {
            type: "bubble",
            size: "micro",
            body: {
              type: "box",
              layout: "vertical",
              justifyContent: "center",
              contents: [
                {
                  type: "button",
                  action: {
                    type: "uri",
                    label: "Show more",
                    uri: "http://linecorp.com/"
                  }
                }
              ]
            }
          }
        ]
      }
    }
    const client = new line.messagingApi.MessagingApiClient({
      channelAccessToken: '{{YOUR_CHANNEL_ACCESS_TOKEN}}'
    })
    return client.pushMessage({
      to: '{{YOUR_USER_ID}}',
      messages: [message]
    })
  })
```

### Result

#### Talk List Screen

![Example4 Alt](docs/images/example4_alt.jpg)

#### Talk Screen

Markdown is applied as part of the carousel.

![Example4 Flex](docs/images/example4_flex.jpg)


## Flex Box

You can convert Markdown into a Flex Box. This allows you to use Markdown as part of a Flex Bubble.

### Code

```typescript
import { convertToFlexBox } from 'line-markdown'
import * as line from '@line/bot-sdk'

const markdownText = `
# Fruits
* apple
* banana
* cherry
`.trim()
convertToFlexBox(markdownText)
  .then(({ flexBox }) => {
    const message = {
      type: "flex",
      altText: 'Fruits',
      contents: {
        type: "bubble",
        size: 'mega',
        body: {
          type: "box",
          layout: "vertical",
          contents: [
            flexBox,
            {
              type: "button",
              action: {
                type: "uri",
                label: "Show more",
                uri: "http://linecorp.com/"
              }
            }
          ]
        }
      }
    }
    const client = new line.messagingApi.MessagingApiClient({
      channelAccessToken: '{{YOUR_CHANNEL_ACCESS_TOKEN}}'
    })
    return client.pushMessage({
      to: '{{YOUR_USER_ID}}',
      messages: [message]
    })
  })
```

### Result

#### Talk List Screen

![Example5 Alt](docs/images/example5_alt.jpg)

#### Talk Screen

A button is positioned below the Markdown.

![Example5 Flex](docs/images/example5_flex.jpg)

# Methods

### convertToFlexMessage(markdown, altText?, options?)

Convert the markdown to a Flex Message.

* **Parameters**
    * **markdown**
        * The Markdown content you want to convert.
    * **altText** (Optional)
        * Alternative text. The default value is `markdown`.
    * **options.size** (Optional)
        * The size of the Flex Bubble. Acceptable values are `nano`, `micro`, `deca`, `hecto`, `kilo`, `mega`, `giga`. The default value is `giga`.

* **Return Value**
    * **flexMessage**
        * The object of the Flex Message.
    * **textType**
        * The type of text in the inputted markdown. Usually returns `markdown`. If it contains only code, it returns `code`, and for content without markdown elements, it returns `plain`.

```typescript
convertToFlexMessage(
  markdown: string,
  altText: string = 'markdown',
  options: ConvertOptions = {}
): Promise<{flexMessage: FlexMessage, textType: TextType}>
```

### convertToFlexBubble(markdown, options?)

Convert the markdown to a Flex Message.

* **Parameters**
    * **markdown**
        * The Markdown content you want to convert.
    * **options.size** (Optional)
        * The size of the Flex Bubble. Acceptable values are `nano`, `micro`, `deca`, `hecto`, `kilo`, `mega`, `giga`. The default value is `giga`.

* **Return Value**
    * **flexBubble**
        * The object of the Flex Bubble.
    * **textType**
        * The type of text in the inputted markdown. Usually returns `markdown`. If it contains only code, it returns `code`, and for content without markdown elements, it returns `plain`.

```typescript
convertToFlexBubble(markdown: string, options: ConvertOptions = {}):
   Promise<{flexBubble: FlexBubble, textType: TextType}>
```

### convertToFlexBox(markdown)

Convert the markdown to a Flex Message.

* **Parameters**
    * **markdown**
        * The Markdown content you want to convert.

* **Return Value**
    * **flexBox**
        * The object of the Flex Box.
    * **textType**
        * The type of text in the inputted markdown. Usually returns `markdown`. If it contains only code, it returns `code`, and for content without markdown elements, it returns `plain`.

```typescript
convertToFlexBox(markdown: string): Promise<{ flexBox: FlexBox, textType: TextType }>
```

## License

[MIT](https://opensource.org/licenses/MIT)
