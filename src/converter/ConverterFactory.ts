import { Token } from "marked"
import { GenericConverter } from "./GenericConverter"
import { HeadingConverter } from "./HeadingConverter"
import { FlexConverter } from "../types"

export class ConverterFactory {
  create(token: Token): FlexConverter {
    if (token.type === 'heading') {
      return new HeadingConverter()
    }  else {
      return new GenericConverter()
    }
  }
}
