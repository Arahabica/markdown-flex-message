import { Tokens } from "marked"
import { FlexComponent } from "@line/bot-sdk"
import { DecoratableFlex, FlexConverter } from "../../types"
import { TextListDecorator } from "../TextListDecorator"

export class StrongConverter implements FlexConverter {
  decorator: TextListDecorator
  constructor() {
    this.decorator = new TextListDecorator()
  }
  convert(token: Tokens.Strong | Tokens.Generic): FlexComponent[] {
    return this.decorator.decorate(token, this.decorate)
  }
  private decorate(span: DecoratableFlex): void {
    span.weight = "bold"
  }
}
