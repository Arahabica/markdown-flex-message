import { it, describe, expect } from 'vitest'
import { promises as fsPromises } from 'fs'
import { join } from 'path'
import { LineClient } from './test-utils/LineClient'
import { messagingApi } from '@line/bot-sdk'


const dir = join(__dirname, 'resources', 'markdown')
describe('validation', () => {
  const channelAccessToken = process.env.CHANNEL_ACCESS_TOKEN
  // If CHANNEL_ACCESS_TOKEN is not set, skip this test
  const _it = channelAccessToken ? it : it.skip
  _it('all', async () => {
    if (!channelAccessToken) throw new Error('CHANNEL_ACCESS_TOKEN is not set')
    const lineClient = new LineClient({ channelAccessToken })
    const fileList = await fsPromises.readdir(dir)
    const messageFileList = fileList.filter((file) => file.endsWith('.json'))
    expect(messageFileList.length).toBeGreaterThan(0)
    for(const messageFile of messageFileList) {
      const message = await fsPromises.readFile(join(dir, messageFile), 'utf-8')
      const m: messagingApi.FlexMessage = {
        type: 'flex' as const,
        altText: 'hello',
        contents: JSON.parse(message)
      }
      const response = await lineClient.validateReplyMessages([m])
      if (response.status === 'failure') {
        console.log(messageFile)
        console.log(JSON.stringify(response, null, 2))
      }
      expect(response.status).toEqual('success')
    }
  })
})
