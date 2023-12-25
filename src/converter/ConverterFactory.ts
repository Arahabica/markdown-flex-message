import { Token } from "marked"
import { GenericConverter } from "./GenericConverter"
import { HeadingConverter } from "./HeadingConverter"
import { FlexConverter } from "../types"
import { ParagraphConverter } from "./PragraphConverter"
import { StrongConverter } from "./StrongConverter"
import { TextConverter } from "./TextConverter"

export class ConverterFactory {
  create(token: Token): FlexConverter {
    if (token.type === 'paragraph') {
      return new ParagraphConverter()
    } else if (token.type === 'heading') {
      return new HeadingConverter()
    } else if (token.type === 'text') {
      return new TextConverter()
    } else if (token.type === 'strong') {
      return new StrongConverter()
    } else {
      return new GenericConverter()
    }
  }
}
