import {
  lexer,
  TokensList as _TokensList
} from 'marked'
import { TextType } from '../types'

export type TokensList = _TokensList

export class MarkDownParser {
  parse(markdown: string): { tokensList: TokensList, textType: TextType } {
    const tokensList = this.parseByMarked(markdown)
    const textType = this.detectTextType(tokensList)
    return { tokensList, textType }
  }
  private parseByMarked(markdown: string): TokensList {
    return lexer(markdown)
  }
  private detectTextType(tokensList: TokensList): TextType {
    console.log(JSON.stringify(tokensList, null, 2))
    if (tokensList.length === 1 && tokensList[0].type === 'code') {
      return 'code'
    }
    if (
      tokensList.length === 1 &&
      tokensList[0].type === 'paragraph' &&
      tokensList[0].tokens?.length === 1) {
      return 'plain'
    }
    return 'markdown'  
  }
}
