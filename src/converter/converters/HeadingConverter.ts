import { Tokens } from "marked"
import { FlexComponent } from "@line/bot-sdk"
import { FlexConverter } from "../../types"

export class HeadingConverter implements FlexConverter {
  convert(token: Tokens.Heading | Tokens.Generic): FlexComponent[] {
    const text = token.text
    let size = "md"
    let paddingBottom = "md"
    if (token.depth === 1) {
      size = "xl"
      paddingBottom = "xl"
    }
    else if (token.depth === 2) {
      size = "lg"
      paddingBottom = "lg"
    }
    const component: FlexComponent = {
      type: "box",
      layout: "vertical",
      contents: [
        {
          type: "text",
          text,
          weight: "bold",
          size
        }
      ],
      paddingBottom
    }
    return [component]
  }
}
