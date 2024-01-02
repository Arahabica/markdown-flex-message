import {
  lexer,
  TokensList as _TokensList
} from 'marked'

export type TokensList = _TokensList

export class MarkDownParser {
  parse(markdown: string): TokensList {
    return lexer(markdown)
  }
}
