import { Token } from "marked"
import { FlexComponent } from "@line/bot-sdk"
import { FlexConverter } from "../../types"

export class GenericConverter implements FlexConverter {
  convert(token: Token): FlexComponent[] {
    const text = token.raw
    return [{
      type: 'text',
      text,
      wrap: true,
    }]
  }
}
