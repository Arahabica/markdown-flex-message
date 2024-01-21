import { Larkdown, convertToFlexBubble } from '../larkdown'
import { it, describe, expect } from 'vitest'
import { promises as fsPromises } from 'fs'
import { join } from 'path'

const dir = join(__dirname, 'resources', 'markdown')
describe('Larkdown', () => {
  describe('Larkdown#convert', () => {
    it('should return an array of tokens', async () => {
      const markdown = await fsPromises.readFile(join(dir, '01hello.md'), 'utf-8')
      const json = await fsPromises.readFile(join(dir, '01hello.json'), 'utf-8')
      const larkdown = new Larkdown()
      const flexContainer = await larkdown.convertToFlexBubble(markdown)
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
    const flexContainer = await convertToFlexBubble(markdown)
    expect(flexContainer).toEqual(JSON.parse(json))
  })
  it('headers', async () => {
    const markdown = await fsPromises.readFile(join(dir, '02headers.md'), 'utf-8')
    const json = await fsPromises.readFile(join(dir, '02headers.json'), 'utf-8')
    const flexContainer = await convertToFlexBubble(markdown)
    // console.log(JSON.stringify(flexContainer, null, 2))
    expect(flexContainer).toEqual(JSON.parse(json))
  })
  it('decorate', async () => {
    const markdown = await fsPromises.readFile(join(dir, '03decorate.md'), 'utf-8')
    const json = await fsPromises.readFile(join(dir, '03decorate.json'), 'utf-8')
    const flexContainer = await convertToFlexBubble(markdown)
    // console.log(JSON.stringify(flexContainer, null, 2))
    expect(flexContainer).toEqual(JSON.parse(json))
  })
  it('code_with_lang', async () => {
    const markdown = await fsPromises.readFile(join(dir, '05code_with_lang.md'), 'utf-8')
    const json = await fsPromises.readFile(join(dir, '05code_with_lang.json'), 'utf-8')
    const flexContainer = await convertToFlexBubble(markdown)
    // console.log(JSON.stringify(flexContainer, null, 2))
    expect(flexContainer).toEqual(JSON.parse(json))
  })
  it('code_with_no_lang', async () => {
    const markdown = await fsPromises.readFile(join(dir, '06code_no_lang.md'), 'utf-8')
    const json = await fsPromises.readFile(join(dir, '06code_no_lang.json'), 'utf-8')
    const flexContainer = await convertToFlexBubble(markdown)
    // console.log(JSON.stringify(flexContainer, null, 2))
    expect(flexContainer).toEqual(JSON.parse(json))
  })
  it('blockquote', async () => {
    const markdown = await fsPromises.readFile(join(dir, '07blockquote.md'), 'utf-8')
    const json = await fsPromises.readFile(join(dir, '07blockquote.json'), 'utf-8')
    const flexContainer = await convertToFlexBubble(markdown)
    // console.log(JSON.stringify(flexContainer, null, 2))
    expect(flexContainer).toEqual(JSON.parse(json))
  })
  it('list_unordered', async () => {
    const markdown = await fsPromises.readFile(join(dir, '08list_unordered.md'), 'utf-8')
    const json = await fsPromises.readFile(join(dir, '08list_unordered.json'), 'utf-8')
    const flexContainer = await convertToFlexBubble(markdown)
    // console.log(JSON.stringify(flexContainer, null, 2))
    expect(flexContainer).toEqual(JSON.parse(json))
  })
  it('list_ordered', async () => {
    const markdown = await fsPromises.readFile(join(dir, '09list_ordered.md'), 'utf-8')
    const json = await fsPromises.readFile(join(dir, '09list_ordered.json'), 'utf-8')
    const flexContainer = await convertToFlexBubble(markdown)
    // console.log(JSON.stringify(flexContainer, null, 2))
    expect(flexContainer).toEqual(JSON.parse(json))
  })
  it('table', async () => {
    const markdown = await fsPromises.readFile(join(dir, '10table.md'), 'utf-8')
    const json = await fsPromises.readFile(join(dir, '10table.json'), 'utf-8')
    const flexContainer = await convertToFlexBubble(markdown)
    // console.log(JSON.stringify(flexContainer, null, 2))
    expect(flexContainer).toEqual(JSON.parse(json))
  })
  it('hr', async () => {
    const markdown = await fsPromises.readFile(join(dir, '11hr.md'), 'utf-8')
    const json = await fsPromises.readFile(join(dir, '11hr.json'), 'utf-8')
    const flexContainer = await convertToFlexBubble(markdown)
    // console.log(JSON.stringify(flexContainer, null, 2))
    expect(flexContainer).toEqual(JSON.parse(json))
  })
  it('image', async () => {
    const markdown = await fsPromises.readFile(join(dir, '12image.md'), 'utf-8')
    const json = await fsPromises.readFile(join(dir, '12image.json'), 'utf-8')
    const flexContainer = await convertToFlexBubble(markdown)
    // console.log(JSON.stringify(flexContainer, null, 2))
    expect(flexContainer).toEqual(JSON.parse(json))
  })
  it('code_many', async () => {
    const markdown = await fsPromises.readFile(join(dir, '13code_many.md'), 'utf-8')
    const json = await fsPromises.readFile(join(dir, '13code_many.json'), 'utf-8')
    const flexContainer = await convertToFlexBubble(markdown)
    if (process.env.DEBUG) {
      console.log(JSON.stringify(flexContainer, null, 2))
    } else {
      expect(flexContainer).toEqual(JSON.parse(json))
    }
  })
})
