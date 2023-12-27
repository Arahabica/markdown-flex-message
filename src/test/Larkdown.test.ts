import { Larkdown, convertToFlexBubble } from '../Larkdown'
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
      const flexContainer = larkdown.convertToFlexBubble(markdown)
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
    const flexContainer = convertToFlexBubble(markdown)
    expect(flexContainer).toEqual(JSON.parse(json))
  })
  it('headers', async () => {
    const markdown = await fsPromises.readFile(join(dir, '02headers.md'), 'utf-8')
    const json = await fsPromises.readFile(join(dir, '02headers.json'), 'utf-8')
    const flexContainer = convertToFlexBubble(markdown)
    // console.log(JSON.stringify(flexContainer, null, 2))
    expect(flexContainer).toEqual(JSON.parse(json))
  })
  it('decorate', async () => {
    const markdown = await fsPromises.readFile(join(dir, '03decorate.md'), 'utf-8')
    const json = await fsPromises.readFile(join(dir, '03decorate.json'), 'utf-8')
    const flexContainer = convertToFlexBubble(markdown)
    // console.log(JSON.stringify(flexContainer, null, 2))
    expect(flexContainer).toEqual(JSON.parse(json))
  })
  it('code_with_lang', async () => {
    const markdown = await fsPromises.readFile(join(dir, '05code_with_lang.md'), 'utf-8')
    const json = await fsPromises.readFile(join(dir, '05code_with_lang.json'), 'utf-8')
    const flexContainer = convertToFlexBubble(markdown)
    // console.log(JSON.stringify(flexContainer, null, 2))
    expect(flexContainer).toEqual(JSON.parse(json))
  })
  it('code_with_no_lang', async () => {
    const markdown = await fsPromises.readFile(join(dir, '06code_no_lang.md'), 'utf-8')
    const json = await fsPromises.readFile(join(dir, '06code_no_lang.json'), 'utf-8')
    const flexContainer = convertToFlexBubble(markdown)
    // console.log(JSON.stringify(flexContainer, null, 2))
    expect(flexContainer).toEqual(JSON.parse(json))
  })
  it('blockquote', async () => {
    const markdown = await fsPromises.readFile(join(dir, '07blockquote.md'), 'utf-8')
    const json = await fsPromises.readFile(join(dir, '07blockquote.json'), 'utf-8')
    const flexContainer = convertToFlexBubble(markdown)
    // console.log(JSON.stringify(flexContainer, null, 2))
    expect(flexContainer).toEqual(JSON.parse(json))
  })
  it('list', async () => {
    const markdown = await fsPromises.readFile(join(dir, '08list_unordered.md'), 'utf-8')
    const json = await fsPromises.readFile(join(dir, '08list_unordered.json'), 'utf-8')
    const flexContainer = convertToFlexBubble(markdown)
    // console.log(JSON.stringify(flexContainer, null, 2))
    expect(flexContainer).toEqual(JSON.parse(json))
  })
})
