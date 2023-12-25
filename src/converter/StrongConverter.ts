import { Tokens } from "marked"
import { FlexComponent } from "@line/bot-sdk"
import { FlexConverter } from "../types"

export class StrongConverter implements FlexConverter {
  convert(token: Tokens.Strong | Tokens.Generic): FlexComponent[] {
    if (!token.tokens) {
      const text = token.text
      return [{
        type: "span",
        text,
        weight: "bold"
      }]
    }
    const text = token.text
    return [{
      type: "span",
      text,
      weight: "bold"
    }]
  }
}
