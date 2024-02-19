import { Tokens } from "marked"
import { FlexConverter, DecoratableFlex, KnownFlexComponent } from "../../types"
import { TextListDecorator } from "../TextListDecorator"

export class CodeSpanConverter implements FlexConverter {
  decorator: TextListDecorator
  constructor() {
    this.decorator = new TextListDecorator()
  }
  async convert(token: Tokens.Em | Tokens.Generic): Promise<KnownFlexComponent[]> {
    return this.decorator.decorate(token, this.decorate)
  }
  private decorate(span: DecoratableFlex): void {
    span.weight = "bold"
    span.size = "sm"
    if (span.text) {
      span.text = "`" + span.text + "`"
    }
  }
}
