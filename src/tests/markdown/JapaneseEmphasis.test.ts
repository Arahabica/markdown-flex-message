import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { messagingApi } from '@line/bot-sdk'
import { convertToFlexBox } from '../../markdown-flex-message'

function textLeaves(
  component: messagingApi.FlexComponent,
): (messagingApi.FlexText | messagingApi.FlexSpan)[] {
  if ('contents' in component && component.contents?.length) {
    return component.contents.flatMap(textLeaves)
  }
  return component.type === 'text' || component.type === 'span'
    ? [component]
    : []
}

describe('日本語の強調をFlex Messageに変換する', () => {
  it('提示された全文で、括弧付きの語句を太字にし、間の「と」は通常文字で残す', async () => {
    const markdown = await readFile(
      join(
        __dirname,
        '../resources/markdown/confucian-view-of-life-and-death.md',
      ),
      'utf8',
    )

    const { flexBox } = await convertToFlexBox(markdown)

    expect(textLeaves(flexBox.contents[0])).toEqual([
      { type: 'span', text: '儒教の死生観は、一言で言えば' },
      {
        type: 'span',
        text: '「現世主義（この世を重視する）」',
        weight: 'bold',
      },
      { type: 'span', text: 'と' },
      { type: 'span', text: '「血の連続性」', weight: 'bold' },
      { type: 'span', text: 'に特徴があります。' },
    ])
    const leaves = textLeaves(flexBox)
    expect(leaves.map((leaf) => leaf.text).join('')).not.toContain('**')
    expect(
      leaves.filter((leaf) => leaf.weight === 'bold').map((leaf) => leaf.text),
    ).toEqual(
      expect.arrayContaining([
        '「分からないことをあれこれ悩むより、人間として正しい道を歩むこと」',
        '立徳：',
        '立功：',
        '立言：',
        '「大きな生命のサイクルの一点」',
        '魂（こん）：',
        '魄（はく）：',
        '「死者を大切にすることは、生者の生き方を正すこと」',
        '「絶望的な終わり」ではなく「家系や社会という大きな流れへの回帰」',
        '「先祖に恥じない生き方をしているか」「子孫に何を残せるか」',
      ]),
    )
  })

  it('日本語の本文に隣接する括弧付きの語句を太字にする', async () => {
    const { flexBox } = await convertToFlexBox('これは**「重要な言葉」**です。')

    expect(textLeaves(flexBox)).toEqual([
      { type: 'span', text: 'これは' },
      { type: 'span', text: '「重要な言葉」', weight: 'bold' },
      { type: 'span', text: 'です。' },
    ])
  })

  it('太字の中にある斜体も維持する', async () => {
    const { flexBox } = await convertToFlexBox(
      'これは**「重要な*言葉*」**です。',
    )

    expect(textLeaves(flexBox)).toEqual([
      { type: 'span', text: 'これは' },
      { type: 'span', text: '「重要な', weight: 'bold' },
      { type: 'span', text: '言葉', weight: 'bold', style: 'italic' },
      { type: 'span', text: '」', weight: 'bold' },
      { type: 'span', text: 'です。' },
    ])
  })

  it.each([
    ['インラインコード', '`**「文字列」**`'],
    ['コードブロック', '```\n**「文字列」**\n```'],
    ['エスケープされた記号', '\\*\\*「文字列」\\*\\*'],
  ])('%s内のアスタリスクを強調記号として消費しない', async (_, markdown) => {
    const { flexBox } = await convertToFlexBox(markdown)

    const leaves = textLeaves(flexBox)
    const text = leaves.map((leaf) => leaf.text).join('')
    expect(text).toContain('「文字列」')
    expect(text.match(/\*/g)).toHaveLength(4)
  })
})
