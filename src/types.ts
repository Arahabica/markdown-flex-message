import { Token } from 'marked'
import { messagingApi } from '@line/bot-sdk'

export * from './MarkdownFlexMessage'
export * from './markdown-flex-message'

export type ConvertOptions = {
  size?: 'nano' | 'micro' | 'kilo' | 'mega' | 'giga'
}

export type ConvertFlexMessageOptions = {
  altText?: string
} & ConvertOptions

export interface FlexConverter {
  convert(token: Token): Promise<KnownFlexComponent[]>
}

export type TextType = 'markdown' | 'code' | 'plain'

export type DecoratableFlex = messagingApi.FlexSpan | messagingApi.FlexText

export type KnownFlexComponent =
  | messagingApi.FlexBox
  | messagingApi.FlexButton
  | messagingApi.FlexFiller
  | messagingApi.FlexIcon
  | messagingApi.FlexImage
  | messagingApi.FlexSeparator
  | messagingApi.FlexSpan
  | messagingApi.FlexText
  | messagingApi.FlexVideo

export type CodeTokenType =
  | 'keyword'
  | 'number'
  | 'function'
  | 'string'
  | 'boolean'
  | 'operator'
  | 'punctuation'
  | 'atrule'
  | 'url'
  | 'selector'
  | 'property'
  | 'important'
  | 'style'
  | 'comment'
  | 'class-name'
  | 'doctype'
  | 'prolog'
  | 'cdata'
  | 'namespace'
  | 'regex'
  | 'tag'
  | 'attr-name'
  | 'attr-value'
  | 'atrule'
  | 'char'
  | 'inserted'
  | 'entity'
  | 'bold'
  | 'italic'
  | 'deleted'
  | 'symbol'
  | 'variable'
  | 'other'

export type CodeToken = {
  type: CodeTokenType
  text: string
}

export type CodeTokenStyle = {
  color?: string
  opacity?: number
  fontWeight?: 'bold' | 'regular'
  fontStyle?: 'italic' | 'normal'
}

export interface CodeHighlightTheme {
  readonly titleBackgroundColor: string
  readonly titleTextColor: string
  readonly codeBackgroundColor: string
  readonly codeTextColor: string
  highlight(code: CodeToken): CodeTokenStyle
}
