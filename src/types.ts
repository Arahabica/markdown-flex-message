import { Token } from "marked"
import { FlexComponent, FlexSpan, FlexText } from "@line/bot-sdk"

export interface FlexConverter {
  convert(token: Token): Promise<FlexComponent[]>
}

export type DecoratableFlex = FlexSpan | FlexText

export type CodeTokenType =
  "keyword" |
  "number" |
  "function" |
  "string" |
  "boolean" |
  "operator" |
  "punctuation" |
  "atrule" |
  "url" |
  "selector" |
  "property" |
  "important" |
  "style" |
  "comment" |
  "class-name" |
  "doctype" |
  "prolog" |
  "cdata" |
  "namespace" |
  "regex" |
  "tag" |
  "attr-name" |
  "attr-value" |
  "atrule" |
  "char" |
  "inserted" |
  "entity" |
  "bold" |
  "italic" |
  "deleted" |
  "symbol" |
  "variable" |
  "other" 

export type CodeToken = {
  type: CodeTokenType
  text: string
}

export type CodeTokenStyle = {
  color?: string
  opacity?: number
  fontWeight?: 'bold' | 'normal'
  fontStyle?: 'italic' | 'normal'
}

export interface CodeHighlightTheme {
  readonly titleBackgroundColor: string
  readonly titleTextColor: string
  readonly codeBackgroundColor: string
  readonly codeTextColor: string
  highlight(code: CodeToken): CodeTokenStyle
}
