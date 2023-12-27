import { Tokens } from "marked"
import { FlexComponent } from "@line/bot-sdk"
import { FlexConverter } from "../../types"
import { InlineConverter } from "./InlineConverter"

export class ParagraphConverter implements FlexConverter {
  private readonly inlineConverter: InlineConverter

  constructor() {
    this.inlineConverter = new InlineConverter()
  }
  convert(token: Tokens.Paragraph): FlexComponent[] {
    return this.inlineConverter.convert(token.tokens)
  }
}
