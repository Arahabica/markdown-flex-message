import { Tokens } from "marked"
import { FlexComponent } from "@line/bot-sdk"
import { FlexConverter } from "../../types"
import { MainConverter } from "../MainConverter"

export class TextConverter implements FlexConverter {
  convert(token: Tokens.Text): FlexComponent[] {
    if (token.tokens) {
      return token.tokens.map(childToken => {
        const mainConverter = new MainConverter()
        return mainConverter.convert(childToken)
      }).reduce((a, b) => a.concat(b), [])
    }
    const text = token.raw
    return [{
      type: 'span',
      text,
    }]
  }
}
