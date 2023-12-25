import { Larkdown, convert } from '../Larkdown'
import { it, describe, expect } from 'vitest'
import { promises as fsPromises } from 'fs'
import { join } from 'path'

const dir = join(__dirname, 'resources')
describe('Larkdown', () => {
  describe('Larkdown#convert', () => {
    it('should return an array of tokens', async () => {
      const markdown = await fsPromises.readFile(join(dir, '01hello.md'), 'utf-8')
      const json = await fsPromises.readFile(join(dir, '01hello.json'), 'utf-8')
      const larkdown = new Larkdown()
      const flexContainer = larkdown.convert(markdown)
      // console.log(JSON.stringify(flexContainer, null, 2))
      expect(flexContainer.type).toEqual('bubble')
      expect(flexContainer).toEqual(JSON.parse(json))
    })
  })
})
describe('convert', () => {
  it('ok', async () => {
    const markdown = await fsPromises.readFile(join(dir, '01hello.md'), 'utf-8')
    const json = await fsPromises.readFile(join(dir, '01hello.json'), 'utf-8')
    const flexContainer = convert(markdown)
    expect(flexContainer).toEqual(JSON.parse(json))
  })
  it('headers', async () => {
    const markdown = await fsPromises.readFile(join(dir, '02headers.md'), 'utf-8')
    const json = await fsPromises.readFile(join(dir, '02headers.json'), 'utf-8')
    const flexContainer = convert(markdown)
    // console.log(JSON.stringify(flexContainer, null, 2))
    expect(flexContainer).toEqual(JSON.parse(json))
  })
  it('strong', async () => {
    const markdown = await fsPromises.readFile(join(dir, '03strong.md'), 'utf-8')
    const json = await fsPromises.readFile(join(dir, '03strong.json'), 'utf-8')
    const flexContainer = convert(markdown)
    // console.log(JSON.stringify(flexContainer, null, 2))
    expect(flexContainer).toEqual(JSON.parse(json))
  })
})
