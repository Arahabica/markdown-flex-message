import { MarkDownParser } from '../../markdown/MarkDownParser'
import { it, describe, expect } from 'vitest'

describe('MarkDownParser', () => {
  describe('parse', () => {
    it('hello', () => {
      const parser = new MarkDownParser()
      const { tokensList } = parser.parse('Hello, world!')
      // console.log(JSON.stringify(tokens, null, 2))
      expect(tokensList[0].type).toEqual('paragraph')
      if (tokensList[0].type !== 'paragraph')
        throw new Error('type is not paragraph')
      expect(tokensList[0].text).toEqual('Hello, world!')
      if (!(tokensList[0].tokens && tokensList[0].tokens[0].type === 'text'))
        throw new Error('type is not text')
      expect(tokensList[0].tokens[0].text).toEqual('Hello, world!')
    })
    it('header', () => {
      const parser = new MarkDownParser()
      const markdown = `
# Hello

## World

hoge
      `.trim()
      const { tokensList } = parser.parse(markdown)
      expect(JSON.parse(JSON.stringify(tokensList))).toEqual([
        {
          type: 'heading',
          raw: '# Hello\n\n',
          depth: 1,
          text: 'Hello',
          tokens: [
            {
              type: 'text',
              raw: 'Hello',
              text: 'Hello',
            },
          ],
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
              text: 'World',
            },
          ],
        },
        {
          type: 'paragraph',
          raw: 'hoge',
          text: 'hoge',
          tokens: [
            {
              type: 'text',
              raw: 'hoge',
              text: 'hoge',
            },
          ],
        },
      ])
    })
    it('strong', () => {
      const parser = new MarkDownParser()
      const markdown = `
hello **World**!
      `.trim()
      const { tokensList, textType } = parser.parse(markdown)
      // console.log(JSON.stringify(tokens, null, 2))
      expect(textType).toEqual('markdown')
      const paragraph = tokensList[0]
      expect(paragraph.type).toEqual('paragraph')
      if (paragraph.type !== 'paragraph')
        throw new Error('type is not paragraph')
      const spans = paragraph.tokens
      expect(spans).toEqual([
        {
          type: 'text',
          raw: 'hello ',
          text: 'hello ',
        },
        {
          type: 'strong',
          raw: '**World**',
          text: 'World',
          tokens: [
            {
              type: 'text',
              raw: 'World',
              text: 'World',
            },
          ],
        },
        {
          type: 'text',
          raw: '!',
          text: '!',
        },
      ])
    })
    it('plain', () => {
      const parser = new MarkDownParser()
      const markdown =
        'As I Remember, Adam, It Was Upon This Fashion Bequeathed Me ' +
        'By Will But Poor A Thousand Crowns, And, As Thou Sayest, ' +
        'Charged My Brother, On His Blessing, To Breed Me Well: And There Begins My Sadness.' +
        '\n\n' +
        'For I Didst Believe Much Joy Would Follow It, '
      const { textType } = parser.parse(markdown)
      expect(textType).toEqual('plain')
    })
    it('code', () => {
      const parser = new MarkDownParser()
      const markdown = '```javascript\nconst a = 1\n```'
      const { textType } = parser.parse(markdown)
      expect(textType).toEqual('code')
    })
    it('code_with_text', () => {
      const parser = new MarkDownParser()
      const markdown =
        'This is a javascript sample code. \n```javascript\nconst a = 1\n```'
      const { textType } = parser.parse(markdown)
      expect(textType).toEqual('markdown')
    })
    it('bold', () => {
      const parser = new MarkDownParser()

      const markdown = `
**A**

**B**

hello
`.trim()
      const { textType } = parser.parse(markdown)
      expect(textType).toEqual('markdown')
    })
  })
})
