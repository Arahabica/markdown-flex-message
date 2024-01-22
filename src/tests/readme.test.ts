import { it, describe } from 'vitest'
import * as line from '@line/bot-sdk'
import { convertToFlexMessage, convertToFlexBubble, convertToFlexBox } from "../line-markdown"

describe('README.md', () => {
  const YOUR_CHANNEL_ACCESS_TOKEN = process.env.CHANNEL_ACCESS_TOKEN
  const YOUR_USER_ID = process.env.USER_ID
  // If CHANNEL_ACCESS_TOKEN is not set, skip this test
  const _it = YOUR_CHANNEL_ACCESS_TOKEN ? it : it.skip
  _it('simple', () => {
    return new Promise<void>((resolve, reject) => {
      if (!YOUR_CHANNEL_ACCESS_TOKEN) throw new Error('CHANNEL_ACCESS_TOKEN is not set')
      if (!YOUR_USER_ID) throw new Error('YOUR_USER_ID is not set')
      const client = new line.messagingApi.MessagingApiClient({
        channelAccessToken: YOUR_CHANNEL_ACCESS_TOKEN
      })
      const markdownText = `
# Fluits
* apple
* banana
* cherry
`.trim()
      convertToFlexMessage(markdownText)
        .then(({ flexMessage }) => {
          return client.pushMessage({
            to: YOUR_USER_ID,
            messages: [flexMessage]
          })
        })
        .then(() => {
          console.log('sent.')
          resolve()
        })
        .catch(reject)
    })
  })
  _it('mega', () => {
    return new Promise<void>((resolve, reject) => {
      if (!YOUR_CHANNEL_ACCESS_TOKEN) throw new Error('CHANNEL_ACCESS_TOKEN is not set')
      if (!YOUR_USER_ID) throw new Error('YOUR_USER_ID is not set')
      const client = new line.messagingApi.MessagingApiClient({
        channelAccessToken: YOUR_CHANNEL_ACCESS_TOKEN
      })
      const markdownText = `
# Fluits
* apple
* banana
* cherry
`.trim()
      convertToFlexMessage(markdownText, 'Fluits', { size: 'mega' })
        .then(({ flexMessage }) => {
          return client.pushMessage({
            to: YOUR_USER_ID,
            messages: [flexMessage]
          })
        })
        .then(() => {
          console.log('sent.')
          resolve()
        })
        .catch(reject)
    })
  })
  _it('code', () => {
    return new Promise<void>((resolve, reject) => {
      if (!YOUR_CHANNEL_ACCESS_TOKEN) throw new Error('CHANNEL_ACCESS_TOKEN is not set')
      if (!YOUR_USER_ID) throw new Error('YOUR_USER_ID is not set')
      const client = new line.messagingApi.MessagingApiClient({
        channelAccessToken: YOUR_CHANNEL_ACCESS_TOKEN
      })
      const markdownText =
        [
          '```typescript                                 ',
          'const add = (a:number, b:number): number => { ',
          '  return a + b                                ',
          '}                                             ',
          '```                                           '
        ].join("\n")
      convertToFlexMessage(markdownText, 'Typescript sample')
        .then(({ flexMessage }) => {
          return client.pushMessage({
            to: YOUR_USER_ID,
            messages: [flexMessage]
          })
        })
        .then(() => {
          console.log('sent.')
          resolve()
        })
        .catch(reject)
    })
  })
  _it('convertToFlexBubble', () => {
    return new Promise<void>((resolve, reject) => {
      if (!YOUR_CHANNEL_ACCESS_TOKEN) throw new Error('CHANNEL_ACCESS_TOKEN is not set')
      if (!YOUR_USER_ID) throw new Error('YOUR_USER_ID is not set')
      const client = new line.messagingApi.MessagingApiClient({
        channelAccessToken: YOUR_CHANNEL_ACCESS_TOKEN
      })
      const markdownText = `
# Fluits
* apple
* banana
* cherry
`.trim()
      convertToFlexBubble(markdownText, { size: 'micro' })
        .then(({ flexBubble }) => {
          const message = {
            type: "flex",
            altText: 'Fluits',
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
          return client.pushMessage({
            to: YOUR_USER_ID,
            messages: [message]
          })
        })
        .then(() => {
          console.log('sent.')
          resolve()
        })
        .catch(reject)
    })
  })
  _it('convertToFlexBox', () => {
    return new Promise<void>((resolve, reject) => {
      if (!YOUR_CHANNEL_ACCESS_TOKEN) throw new Error('CHANNEL_ACCESS_TOKEN is not set')
      if (!YOUR_USER_ID) throw new Error('YOUR_USER_ID is not set')
      const client = new line.messagingApi.MessagingApiClient({
        channelAccessToken: YOUR_CHANNEL_ACCESS_TOKEN
      })
      const markdownText = `
# Fluits
* apple
* banana
* cherry
`.trim()
      convertToFlexBox(markdownText)
        .then(({ flexBox }) => {
          const message = {
            type: "flex",
            altText: 'Fluits',
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
          return client.pushMessage({
            to: YOUR_USER_ID,
            messages: [message]
          })
        })
        .then(() => {
          console.log('sent.')
          resolve()
        })
        .catch(reject)
    })
  })
})
