import { Tokens } from "marked"
import { FlexComponent } from "@line/bot-sdk"
import { FlexConverter } from "../../types"
import { InlineConverter } from "./InlineConverter"

export class ParagraphConverter implements FlexConverter {
  private readonly inlineConverter: InlineConverter

  constructor() {
    this.inlineConverter = new InlineConverter()
  }
  async convert(token: Tokens.Paragraph): Promise<FlexComponent[]> {
    return this.inlineConverter.convert(token.tokens)
  }
}
