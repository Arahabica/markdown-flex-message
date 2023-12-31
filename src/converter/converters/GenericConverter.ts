import { Token } from "marked"
import { FlexComponent } from "@line/bot-sdk"
import { FlexConverter } from "../../types"

export class GenericConverter implements FlexConverter {
  async convert(token: Token): Promise<FlexComponent[]> {
    const text = token.raw
    return [{
      type: 'text',
      text,
      wrap: true,
    }]
  }
}
