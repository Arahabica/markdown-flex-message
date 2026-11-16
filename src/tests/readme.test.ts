import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { it, describe, expect } from 'vitest'
import { messagingApi } from '@line/bot-sdk'
import {
  convertToFlexMessage,
  convertToFlexBubble,
  convertToFlexBox,
} from '../markdown-flex-message'

describe('README.md', () => {
  const YOUR_CHANNEL_ACCESS_TOKEN = process.env.CHANNEL_ACCESS_TOKEN
  const YOUR_USER_ID = process.env.USER_ID
  // If CHANNEL_ACCESS_TOKEN is not set, skip this test
  const _it = YOUR_CHANNEL_ACCESS_TOKEN ? it : it.skip
  _it(
    '提示された儒教の全文を日本語の太字付きで自分宛てに送信できる',
    async () => {
      if (!YOUR_CHANNEL_ACCESS_TOKEN)
        throw new Error('CHANNEL_ACCESS_TOKEN is not set')
      if (!YOUR_USER_ID) throw new Error('YOUR_USER_ID is not set')
      const markdown = await readFile(
        join(
          __dirname,
          'resources/markdown/confucian-view-of-life-and-death.md',
        ),
        'utf8',
      )
      const { flexMessage } = await convertToFlexMessage(markdown, {
        altText: '日本語の太字表示テスト：儒教の死生観',
      })
      if (flexMessage.contents.type !== 'bubble')
        throw new Error('Expected a Flex Bubble')
      expect(flexMessage.contents.body?.contents[0]).toEqual({
        type: 'text',
        wrap: true,
        contents: [
          { type: 'span', text: '儒教の死生観は、一言で言えば' },
          {
            type: 'span',
            text: '「現世主義（この世を重視する）」',
            weight: 'bold',
          },
          { type: 'span', text: 'と' },
          { type: 'span', text: '「血の連続性」', weight: 'bold' },
          { type: 'span', text: 'に特徴があります。' },
        ],
      })
      const client = new messagingApi.MessagingApiClient({
        channelAccessToken: YOUR_CHANNEL_ACCESS_TOKEN,
      })

      await client.validatePush({ messages: [flexMessage] })
      const response = await client.pushMessage({
        to: YOUR_USER_ID,
        messages: [flexMessage],
      })

      expect(response.sentMessages).toHaveLength(1)
    },
    30000,
  )
  _it('simple', () => {
    return new Promise<void>((resolve, reject) => {
      if (!YOUR_CHANNEL_ACCESS_TOKEN)
        throw new Error('CHANNEL_ACCESS_TOKEN is not set')
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
            channelAccessToken: YOUR_CHANNEL_ACCESS_TOKEN,
          })
          return client.pushMessage({
            to: YOUR_USER_ID,
            messages: [flexMessage],
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
      if (!YOUR_CHANNEL_ACCESS_TOKEN)
        throw new Error('CHANNEL_ACCESS_TOKEN is not set')
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
            channelAccessToken: YOUR_CHANNEL_ACCESS_TOKEN,
          })
          return client.pushMessage({
            to: YOUR_USER_ID,
            messages: [flexMessage],
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
      if (!YOUR_CHANNEL_ACCESS_TOKEN)
        throw new Error('CHANNEL_ACCESS_TOKEN is not set')
      if (!YOUR_USER_ID) throw new Error('YOUR_USER_ID is not set')
      const markdownText = [
        '```typescript                                 ',
        'const add = (a:number, b:number): number => { ',
        '  return a + b                                ',
        '}                                             ',
        '```                                           ',
      ].join('\n')
      convertToFlexMessage(markdownText, { altText: 'Typescript sample' })
        .then(({ flexMessage }) => {
          const client = new messagingApi.MessagingApiClient({
            channelAccessToken: YOUR_CHANNEL_ACCESS_TOKEN,
          })
          return client.pushMessage({
            to: YOUR_USER_ID,
            messages: [flexMessage],
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
      if (!YOUR_CHANNEL_ACCESS_TOKEN)
        throw new Error('CHANNEL_ACCESS_TOKEN is not set')
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
            type: 'flex' as const,
            altText: 'Fruits',
            contents: {
              type: 'carousel' as const,
              contents: [
                flexBubble,
                {
                  type: 'bubble' as const,
                  size: 'micro' as const,
                  body: {
                    type: 'box' as const,
                    layout: 'vertical' as const,
                    justifyContent: 'center' as const,
                    contents: [
                      {
                        type: 'button' as const,
                        action: {
                          type: 'uri' as const,
                          label: 'Show more',
                          uri: 'http://linecorp.com/',
                        },
                      },
                    ],
                  },
                },
              ],
            },
          }
          const client = new messagingApi.MessagingApiClient({
            channelAccessToken: YOUR_CHANNEL_ACCESS_TOKEN,
          })
          return client.pushMessage({
            to: YOUR_USER_ID,
            messages: [message],
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
      if (!YOUR_CHANNEL_ACCESS_TOKEN)
        throw new Error('CHANNEL_ACCESS_TOKEN is not set')
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
            type: 'flex' as const,
            altText: markdownText.slice(0, 200),
            contents: {
              type: 'bubble' as const,
              size: 'mega' as const,
              body: {
                type: 'box' as const,
                layout: 'vertical' as const,
                contents: [
                  flexBox,
                  {
                    type: 'button' as const,
                    action: {
                      type: 'clipboard' as const,
                      label: 'Copy',
                      clipboardText: markdownText.slice(0, 1000),
                    },
                  },
                ],
              },
            },
          }
          const client = new messagingApi.MessagingApiClient({
            channelAccessToken: YOUR_CHANNEL_ACCESS_TOKEN,
          })
          return client.pushMessage({
            to: YOUR_USER_ID,
            messages: [message],
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
