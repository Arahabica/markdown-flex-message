import { Marked, TokensList as _TokensList } from 'marked'
import markedCjkFriendly from 'marked-cjk-friendly'
import { TextType } from '../types'

export type TokensList = _TokensList

export class MarkDownParser {
  private readonly marked = new Marked(markedCjkFriendly())

  parse(markdown: string): { tokensList: TokensList; textType: TextType } {
    const tokensList = this.parseByMarked(markdown)
    const textType = this.detectTextType(tokensList)
    return { tokensList, textType }
  }
  private parseByMarked(markdown: string): TokensList {
    return this.marked.lexer(markdown)
  }
  private detectTextType(tokensList: TokensList): TextType {
    if (tokensList.length === 1 && tokensList[0].type === 'code') {
      return 'code'
    }
    for (const token of tokensList) {
      if (
        !(
          token.type === 'paragraph' &&
          token.tokens?.length === 1 &&
          token.tokens[0].type === 'text'
        ) &&
        token.type !== 'space'
      ) {
        return 'markdown'
      }
    }
    return 'plain'
  }
}
