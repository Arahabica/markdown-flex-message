import { Tokens } from "marked"
import { FlexConverter, KnownFlexComponent } from "../../types"
import { InlineConverter } from "./InlineConverter"

export class ParagraphConverter implements FlexConverter {
  private readonly inlineConverter: InlineConverter

  constructor() {
    this.inlineConverter = new InlineConverter()
  }
  async convert(token: Tokens.Paragraph): Promise<KnownFlexComponent[]> {
    return this.inlineConverter.convert(token.tokens)
  }
}
