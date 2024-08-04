import { it, describe } from 'vitest'
// import * as line from '@line/bot-sdk'
import { messagingApi } from '@line/bot-sdk'
import { convertToFlexMessage, convertToFlexBubble, convertToFlexBox } from "../markdown-flex-message"

describe('README.md', () => {
  const YOUR_CHANNEL_ACCESS_TOKEN = process.env.CHANNEL_ACCESS_TOKEN
  const YOUR_USER_ID = process.env.USER_ID
  // If CHANNEL_ACCESS_TOKEN is not set, skip this test
  const _it = YOUR_CHANNEL_ACCESS_TOKEN ? it : it.skip
  _it('simple', () => {
    return new Promise<void>((resolve, reject) => {
      if (!YOUR_CHANNEL_ACCESS_TOKEN) throw new Error('CHANNEL_ACCESS_TOKEN is not set')
      if (!YOUR_USER_ID) throw new Error('YOUR_USER_ID is not set')
      const markdownText = `
# Fruits
* apple
* banana
* cherry
`.trim()
      convertToFlexMessage(markdownText)
        .then(({ flexMessage }) => {
          const client = new messagingApi.MessagingApiClient({
            channelAccessToken: YOUR_CHANNEL_ACCESS_TOKEN
          })
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
      const markdownText = `
# Fruits
* apple
* banana
* cherry
`.trim()
      convertToFlexMessage(markdownText, { altText: 'Fruits', size: 'mega' })
        .then(({ flexMessage }) => {
          const client = new messagingApi.MessagingApiClient({
            channelAccessToken: YOUR_CHANNEL_ACCESS_TOKEN
          })
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
      const markdownText =
        [
          '```typescript                                 ',
          'const add = (a:number, b:number): number => { ',
          '  return a + b                                ',
          '}                                             ',
          '```                                           '
        ].join("\n")
      convertToFlexMessage(markdownText, { altText: 'Typescript sample' })
        .then(({ flexMessage }) => {
          const client = new messagingApi.MessagingApiClient({
            channelAccessToken: YOUR_CHANNEL_ACCESS_TOKEN
          })
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
      const markdownText = `
# Fruits
* apple
* banana
* cherry
`.trim()
      convertToFlexBubble(markdownText, { size: 'micro' })
        .then(({ flexBubble }) => {
          const message = {
            type: "flex" as const,
            altText: 'Fruits',
            contents: {
              type: 'carousel' as const,
              contents: [
                flexBubble,
                {
                  type: "bubble" as const,
                  size: "micro" as const,
                  body: {
                    type: "box" as const,
                    layout: "vertical" as const,
                    justifyContent: "center" as const,
                    contents: [
                      {
                        type: "button" as const,
                        action: {
                          type: "uri" as const,
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
          const client = new messagingApi.MessagingApiClient({
            channelAccessToken: YOUR_CHANNEL_ACCESS_TOKEN
          })
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
      const markdownText = `
# Fruits
* apple
* banana
* cherry
`.trim()
      convertToFlexBox(markdownText)
        .then(({ flexBox }) => {
          const message = {
            type: "flex" as const,
            altText: 'Fruits',
            contents: {
              type: "bubble" as const,
              size: 'mega' as const,
              body: {
                type: "box" as const,
                layout: "vertical" as const,
                contents: [
                  flexBox,
                  {
                    type: "button" as const,
                    action: {
                      type: "uri" as const,
                      label: "Show more",
                      uri: "http://linecorp.com/"
                    }
                  }
                ]
              }
            }
          }
          const client = new messagingApi.MessagingApiClient({
            channelAccessToken: YOUR_CHANNEL_ACCESS_TOKEN
          })
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

