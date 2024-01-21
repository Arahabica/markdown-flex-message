import { it, describe, expect } from 'vitest'
import { promises as fsPromises } from 'fs'
import { join } from 'path'
import { LineClient } from './test-utils/LineClient'
import { FlexMessage } from '@line/bot-sdk'


const dir = join(__dirname, 'resources', 'markdown')
describe('validation', () => {
  it.skip('all', async () => {
    const channelAccessToken = process.env.CHANNEL_ACCESS_TOKEN
    if (!channelAccessToken) throw new Error('CHANNEL_ACCESS_TOKEN is not set')
    const lineClient = new LineClient({ channelAccessToken })
    const fileList = await fsPromises.readdir(dir)
    const messageFileList = fileList.filter((file) => file.endsWith('.json'))
    expect(messageFileList.length).toBeGreaterThan(0)
    for(const messageFile of messageFileList) {
      const message = await fsPromises.readFile(join(dir, messageFile), 'utf-8')
      const m: FlexMessage = {
        type: 'flex',
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
