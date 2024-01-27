import {
  LineMarkdown,
  convertToFlexMessage,
  convertToFlexBubble,
  convertToFlexBox
} from '../line-markdown'
import { it, describe, expect } from 'vitest'
import { promises as fsPromises } from 'fs'
import { join } from 'path'

const dir = join(__dirname, 'resources', 'markdown')
describe('LineMarkdown', () => {
  describe('LineMarkdown#convert', () => {
    it('should return an array of tokens', async () => {
      const markdown = await fsPromises.readFile(join(dir, '01hello.md'), 'utf-8')
      const json = await fsPromises.readFile(join(dir, '01hello.json'), 'utf-8')
      const lineMarkdown = new LineMarkdown()
      const { flexBubble } = await lineMarkdown.convertToFlexBubble(markdown)
      // console.log(JSON.stringify(flexContainer, null, 2))
      expect(flexBubble.type).toEqual('bubble')
      expect(flexBubble).toEqual(JSON.parse(json))
    })
  })
})
describe('convertToFlexMessage', () => {
  it('default_alt_text', async () => {
    const markdown = await fsPromises.readFile(join(dir, '07blockquote.md'), 'utf-8')
    const json = await fsPromises.readFile(join(dir, '07blockquote.json'), 'utf-8')
    const { flexMessage } = await convertToFlexMessage(markdown)
    if (process.env.DEBUG) {
      console.log(JSON.stringify(flexMessage, null, 2))
    } else {
      const flexBubble = JSON.parse(json)
      expect(flexMessage).toEqual({
        type: 'flex',
        altText: 'markdown',
        contents: flexBubble
      })
    }
  })
  it('alt_text', async () => {
    const markdown = await fsPromises.readFile(join(dir, '07blockquote.md'), 'utf-8')
    const json = await fsPromises.readFile(join(dir, '07blockquote.json'), 'utf-8')
    const { flexMessage } = await convertToFlexMessage(markdown, 'Alternative text')
    if (process.env.DEBUG) {
      console.log(JSON.stringify(flexMessage, null, 2))
    } else {
      const flexBubble = JSON.parse(json)
      expect(flexMessage).toEqual({
        type: 'flex',
        altText: 'Alternative text',
        contents: flexBubble
      })
    }
  })
})

describe('convertToFlexBubble', () => {
  it('ok', async () => {
    const markdown = await fsPromises.readFile(join(dir, '01hello.md'), 'utf-8')
    const json = await fsPromises.readFile(join(dir, '01hello.json'), 'utf-8')
    const { flexBubble } = await convertToFlexBubble(markdown)
    if (process.env.DEBUG) {
      console.log(JSON.stringify(flexBubble, null, 2))
    } else {
      expect(flexBubble).toEqual(JSON.parse(json))
    }
  })
  it('headers', async () => {
    const markdown = await fsPromises.readFile(join(dir, '02headers.md'), 'utf-8')
    const json = await fsPromises.readFile(join(dir, '02headers.json'), 'utf-8')
    const { flexBubble } = await convertToFlexBubble(markdown)
    if (process.env.DEBUG) {
      console.log(JSON.stringify(flexBubble, null, 2))
    } else {
      expect(flexBubble).toEqual(JSON.parse(json))
    }
  })
  it('decorate', async () => {
    const markdown = await fsPromises.readFile(join(dir, '03decorate.md'), 'utf-8')
    const json = await fsPromises.readFile(join(dir, '03decorate.json'), 'utf-8')
    const { flexBubble } = await convertToFlexBubble(markdown)
    if (process.env.DEBUG) {
      console.log(JSON.stringify(flexBubble, null, 2))
    } else {
      expect(flexBubble).toEqual(JSON.parse(json))
    }
  })
  it('code_with_lang', async () => {
    const markdown = await fsPromises.readFile(join(dir, '05code_with_lang.md'), 'utf-8')
    const json = await fsPromises.readFile(join(dir, '05code_with_lang.json'), 'utf-8')
    const { flexBubble } = await convertToFlexBubble(markdown)
    if (process.env.DEBUG) {
      console.log(JSON.stringify(flexBubble, null, 2))
    } else {
      expect(flexBubble).toEqual(JSON.parse(json))
    }
  })
  it('code_with_no_lang', async () => {
    const markdown = await fsPromises.readFile(join(dir, '06code_no_lang.md'), 'utf-8')
    const json = await fsPromises.readFile(join(dir, '06code_no_lang.json'), 'utf-8')
    const { flexBubble } = await convertToFlexBubble(markdown)
    if (process.env.DEBUG) {
      console.log(JSON.stringify(flexBubble, null, 2))
    } else {
      expect(flexBubble).toEqual(JSON.parse(json))
    }
  })
  it('blockquote', async () => {
    const markdown = await fsPromises.readFile(join(dir, '07blockquote.md'), 'utf-8')
    const json = await fsPromises.readFile(join(dir, '07blockquote.json'), 'utf-8')
    const { flexBubble } = await convertToFlexBubble(markdown)
    if (process.env.DEBUG) {
      console.log(JSON.stringify(flexBubble, null, 2))
    } else {
      expect(flexBubble).toEqual(JSON.parse(json))
    }
  })
  it('list_unordered', async () => {
    const markdown = await fsPromises.readFile(join(dir, '08list_unordered.md'), 'utf-8')
    const json = await fsPromises.readFile(join(dir, '08list_unordered.json'), 'utf-8')
    const { flexBubble } = await convertToFlexBubble(markdown)
    if (process.env.DEBUG) {
      console.log(JSON.stringify(flexBubble, null, 2))
    } else {
      expect(flexBubble).toEqual(JSON.parse(json))
    }
  })
  it('list_ordered', async () => {
    const markdown = await fsPromises.readFile(join(dir, '09list_ordered.md'), 'utf-8')
    const json = await fsPromises.readFile(join(dir, '09list_ordered.json'), 'utf-8')
    const { flexBubble } = await convertToFlexBubble(markdown)
    if (process.env.DEBUG) {
      console.log(JSON.stringify(flexBubble, null, 2))
    } else {
      expect(flexBubble).toEqual(JSON.parse(json))
    }
  })
  it('table', async () => {
    const markdown = await fsPromises.readFile(join(dir, '10table.md'), 'utf-8')
    const json = await fsPromises.readFile(join(dir, '10table.json'), 'utf-8')
    const { flexBubble } = await convertToFlexBubble(markdown)
    if (process.env.DEBUG) {
      console.log(JSON.stringify(flexBubble, null, 2))
    } else {
      expect(flexBubble).toEqual(JSON.parse(json))
    }
  })
  it('hr', async () => {
    const markdown = await fsPromises.readFile(join(dir, '11hr.md'), 'utf-8')
    const json = await fsPromises.readFile(join(dir, '11hr.json'), 'utf-8')
    const { flexBubble } = await convertToFlexBubble(markdown)
    if (process.env.DEBUG) {
      console.log(JSON.stringify(flexBubble, null, 2))
    } else {
      expect(flexBubble).toEqual(JSON.parse(json))
    }
  })
  it('image', async () => {
    const markdown = await fsPromises.readFile(join(dir, '12image.md'), 'utf-8')
    const json = await fsPromises.readFile(join(dir, '12image.json'), 'utf-8')
    const { flexBubble } = await convertToFlexBubble(markdown)
    if (process.env.DEBUG) {
      console.log(JSON.stringify(flexBubble, null, 2))
    } else {
      expect(flexBubble).toEqual(JSON.parse(json))
    }
  })
  it('code_many', async () => {
    const markdown = await fsPromises.readFile(join(dir, '13code_many.md'), 'utf-8')
    const json = await fsPromises.readFile(join(dir, '13code_many.json'), 'utf-8')
    const { flexBubble } = await convertToFlexBubble(markdown)
    if (process.env.DEBUG) {
      console.log(JSON.stringify(flexBubble, null, 2))
    } else {
      expect(flexBubble).toEqual(JSON.parse(json))
    }
  })
  it('code_only', async () => {
    const markdown = await fsPromises.readFile(join(dir, '14code_only.md'), 'utf-8')
    const json = await fsPromises.readFile(join(dir, '14code_only.json'), 'utf-8')
    const { flexBubble, textType } = await convertToFlexBubble(markdown)
    if (process.env.DEBUG) {
      console.log(JSON.stringify(flexBubble, null, 2))
    } else {
      const flexBubble = JSON.parse(json)
      expect(textType).toEqual('code')
      expect(flexBubble.body.paddingAll).toEqual('none')
      expect(flexBubble).toEqual(JSON.parse(json))
    }
  })
  it('html', async () => {
    const markdown = await fsPromises.readFile(join(dir, '15html.md'), 'utf-8')
    const json = await fsPromises.readFile(join(dir, '15html.json'), 'utf-8')
    const { flexBubble } = await convertToFlexBubble(markdown)
    if (process.env.DEBUG) {
      console.log(JSON.stringify(flexBubble, null, 2))
    } else {
      const flexBubble = JSON.parse(json)
      expect(flexBubble).toEqual(JSON.parse(json))
    }
  })
  it('image_invalid', async () => {
    const markdown = await fsPromises.readFile(join(dir, '16image_invalid.md'), 'utf-8')
    const json = await fsPromises.readFile(join(dir, '16image_invalid.json'), 'utf-8')
    const { flexBubble } = await convertToFlexBubble(markdown)
    if (process.env.DEBUG) {
      console.log(JSON.stringify(flexBubble, null, 2))
    } else {
      const flexBubble = JSON.parse(json)
      expect(flexBubble).toEqual(JSON.parse(json))
    }
  })
})

describe('convertToFlexBox', () => {
  it('code_only', async () => {
    const markdown = await fsPromises.readFile(join(dir, '14code_only.md'), 'utf-8')
    const json = await fsPromises.readFile(join(dir, '14code_only.json'), 'utf-8')
    const { flexBox, textType } = await convertToFlexBox(markdown)
    if (process.env.DEBUG) {
      console.log(JSON.stringify(flexBox, null, 2))
    } else {
      const flexBubble = JSON.parse(json)
      expect(textType).toEqual('code')
      expect(flexBox).toEqual(flexBubble.body)
    }
  })
})
