import { promises as fsPromises } from 'fs'
import { join } from 'path'
import { MarkDownParser } from '../../parser/MarkDownParser'
import { it, describe, expect } from 'vitest'

describe('MarkDownParser', () => {
  describe('parse', () => {
    it('hello', () => {
      const parser = new MarkDownParser()
      const tokens = parser.parse('Hello, world!')
      // console.log(JSON.stringify(tokens, null, 2))
      expect(tokens[0].type).toEqual('paragraph')
      if (tokens[0].type !== 'paragraph')
        throw new Error('type is not paragraph')
      expect(tokens[0].text).toEqual('Hello, world!')
      if (!(tokens[0].tokens && tokens[0].tokens[0].type === 'text'))
        throw new Error('type is not text')
      expect(tokens[0].tokens[0].text).toEqual('Hello, world!')
    })
    it('header', () => {
      const parser = new MarkDownParser()
      const markdown = `
# Hello

## World

hoge
      `.trim()
      const tokens = parser.parse(markdown)
      // console.log(JSON.stringify(tokens, null, 2))
      expect(JSON.parse(JSON.stringify(tokens))).toEqual([
        {
          type: 'heading',
          raw: '# Hello\n\n',
          depth: 1,
          text: 'Hello',
          tokens: [
            {
              type: 'text',
              raw: 'Hello',
              text: 'Hello'
            }
          ]
        },
        {
          type: 'heading',
          raw: '## World\n\n',
          depth: 2,
          text: 'World',
          tokens: [
            {
              type: 'text',
              raw: 'World',
              text: 'World'
            }
          ]
        },
        {
          type: 'paragraph',
          raw: 'hoge',
          text: 'hoge',
          tokens: [
            {
              type: 'text',
              raw: 'hoge',
              text: 'hoge'
            }
          ]
        }
      ])
    })
    it('strong', () => {
      const parser = new MarkDownParser()
      const markdown = `
hello **World**!
      `.trim()
      const tokens = parser.parse(markdown)
      // console.log(JSON.stringify(tokens, null, 2))
      const paragraph = tokens[0]
      expect(paragraph.type).toEqual('paragraph')
      if (paragraph.type !== 'paragraph')
        throw new Error('type is not paragraph')
      const spans = paragraph.tokens
      expect(spans).toEqual([
        {
          "type": "text",
          "raw": "hello ",
          "text": "hello "
        },
        {
          "type": "strong",
          "raw": "**World**",
          "text": "World",
          "tokens": [
            {
              "type": "text",
              "raw": "World",
              "text": "World"
            }
          ]
        },
        {
          "type": "text",
          "raw": "!",
          "text": "!"
        }
      ])
    })
    // it('main', async () => {
    //   const parser = new MarkDownParser()
    //   const markdownPath = join(__dirname, '../resources/10table.md')
    //   const markdown = await fsPromises.readFile(markdownPath, 'utf-8')
    //   const tokens = parser.parse(markdown)
    //   console.log(JSON.stringify(tokens, null, 2))
    // })
  })
})
