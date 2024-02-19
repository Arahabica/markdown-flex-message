import { Tokens } from "marked"
import { DecoratableFlex, FlexConverter, KnownFlexComponent } from "../../types"
import { TextListDecorator } from "../TextListDecorator"

export class StrongConverter implements FlexConverter {
  decorator: TextListDecorator
  constructor() {
    this.decorator = new TextListDecorator()
  }
  async convert(token: Tokens.Strong | Tokens.Generic): Promise<KnownFlexComponent[]> {
    return this.decorator.decorate(token, this.decorate)
  }
  private decorate(span: DecoratableFlex): void {
    span.weight = "bold"
  }
}
