import { afterEach, describe, expect, it, vi } from 'vitest'
import { marked, Tokens } from 'marked'
import { CodeParser } from '../code/CodeParser'
import { DefaultCodeHighlightTheme } from '../code/DefaultCodeHighlightTheme'
import { CodeConverter } from '../converter/converters/CodeConverter'
import { ImageConverter } from '../converter/converters/ImageConverter'
import { TableConverter } from '../converter/converters/TableConverter'
import { TextListDecorator } from '../converter/TextListDecorator'
import { CodeTokenType } from '../types'

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('conversion fallbacks', () => {
  it('preserves code when its language cannot be highlighted', async () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    const converter = new CodeConverter(
      new CodeParser(),
      new DefaultCodeHighlightTheme(),
    )
    const text = '<unknown> & code'
    const result = await converter.getCodeComponent(text, 'unknown-language')
    expect(result).toMatchObject({
      type: 'box',
      contents: [{ type: 'text', text, wrap: true, color: '#f8f8f2' }],
    })
    expect(console.warn).toHaveBeenCalledOnce()
  })

  it('keeps an unavailable image with the default aspect ratio', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')))
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    const token = marked.lexer('![alt](https://example.com/image.png)')[0]
    if (token.type !== 'paragraph' || !token.tokens) {
      throw new Error('Expected paragraph with inline tokens')
    }
    const image = token.tokens[0] as Tokens.Image
    expect(await new ImageConverter().convert(image)).toEqual([
      {
        type: 'image',
        url: 'https://example.com/image.png',
        aspectRatio: '20:13',
        size: 'full',
      },
    ])
  })
})

describe('code highlight styles', () => {
  it.each<[CodeTokenType, object]>([
    ['atrule', { color: '#e6db74' }],
    ['namespace', { color: '#f8f8f2', opacity: 0.7 }],
    ['regex', { color: '#fd971f' }],
    ['tag', { color: '#f92672' }],
    ['attr-name', { color: '#a6e22e' }],
    ['char', { color: '#a6e22e' }],
    ['inserted', { color: '#a6e22e' }],
    ['entity', {}],
    ['bold', { fontWeight: 'bold' }],
    ['italic', { fontStyle: 'italic' }],
    ['deleted', { color: '#f92672' }],
    ['symbol', { color: '#f92672' }],
    ['variable', { color: '#f8f8f2' }],
    ['other', {}],
  ])('renders %s tokens with their style', (type, expected) => {
    expect(
      new DefaultCodeHighlightTheme().highlight({ type, text: 'value' }),
    ).toEqual(expected)
  })
})

describe('table cells', () => {
  it('keeps empty header and body cells as boxes', async () => {
    const token = marked.lexer('| A |   |\n| - | - |\n|   | B |')[0]
    const result = await new TableConverter().convert(token as Tokens.Table)
    expect(result[1]).toMatchObject({
      contents: [
        {
          contents: [
            expect.objectContaining({ flex: 1 }),
            { type: 'box', flex: 2, contents: [] },
          ],
        },
        {
          contents: [
            { type: 'box', flex: 1, contents: [] },
            expect.objectContaining({ flex: 2 }),
          ],
        },
      ],
    })
  })

  it('maps left, center, and right alignment to Flex text alignment', async () => {
    const token = marked.lexer(
      '| A | B | C |\n| :- | :-: | -: |\n| x | y | z |',
    )[0]
    const result = await new TableConverter().convert(token as Tokens.Table)
    expect(result[1]).toMatchObject({
      contents: ['start', 'center', 'end'].map((align) => ({
        contents: [expect.anything(), expect.objectContaining({ align })],
      })),
    })
  })
})

it('decorates paragraph text while preserving nested bold spans', async () => {
  const token = marked.lexer('nested **text**')[0]
  const result = await new TextListDecorator().decorate(
    { type: 'strong', raw: '', text: '', tokens: [token] },
    (span) => {
      span.color = '#123456'
    },
  )
  expect(result).toMatchObject([
    {
      type: 'text',
      color: '#123456',
      contents: [{ text: 'nested ' }, { text: 'text', weight: 'bold' }],
    },
  ])
})
