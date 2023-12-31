import { Token } from "marked"
import { FlexConverter } from "../types"
import { GenericConverter } from "./converters/GenericConverter"
import { HeadingConverter } from "./converters/HeadingConverter"
import { CodeConverter } from "./converters/CodeConverter"
import { ParagraphConverter } from "./converters/PragraphConverter"
import { ImageConverter } from "./converters/ImageConverter"
import { StrongConverter } from "./converters/StrongConverter"
import { TextConverter } from "./converters/TextConverter"
import { EmConverter } from "./converters/EmConverter"
import { LinkConverter } from "./converters/LinkConverter"
import { DelConverter } from "./converters/DelConverter"
import { CodeSpanConverter } from "./converters/CodeSpanConverter"
import { BlockquoteConverter } from "./converters/BlockquotesConverter"
import { ListConverter } from "./converters/ListConverter"
import { HrConverter } from "./converters/HrConverter"
import { SpaceConverter } from "./converters/SpaceConverter"

export class ConverterFactory {
  create(token: Token): FlexConverter {
    if (token.type === 'paragraph') {
      return new ParagraphConverter()
    } else if (token.type === 'heading') {
      return new HeadingConverter()
    } else if (token.type === 'code') {
      return new CodeConverter()
    } else if (token.type === 'blockquote') {
      return new BlockquoteConverter()
    } else if (token.type === 'image') {
      return new ImageConverter()
    } else if (token.type === 'list') {
      return new ListConverter()
    } else if (token.type === 'text') {
      return new TextConverter()
    } else if (token.type === 'strong') {
      return new StrongConverter()
    } else if (token.type === 'em') {
      return new EmConverter()
    } else if (token.type === 'del') {
      return new DelConverter()
    } else if (token.type === 'codespan') {
      return new CodeSpanConverter()
    } else if (token.type === 'link') {
      return new LinkConverter()
    } else if (token.type === 'hr') {
      return new HrConverter()
    } else if (token.type === 'space') {
      return new SpaceConverter()
    } else {
      return new GenericConverter()
    }
  }
}
