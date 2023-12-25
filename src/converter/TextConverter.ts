import { Token } from "marked"
import { FlexComponent } from "@line/bot-sdk"
import { FlexConverter } from "../types"

export class TextConverter implements FlexConverter {
  convert(token: Token): FlexComponent[] {
    const text = token.raw
    return [{
      type: 'span',
      text,
    }]
  }
}
