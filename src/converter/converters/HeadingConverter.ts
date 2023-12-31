import { Tokens } from "marked"
import { FlexComponent } from "@line/bot-sdk"
import { FlexConverter } from "../../types"

export class HeadingConverter implements FlexConverter {
  async convert(token: Tokens.Heading | Tokens.Generic): Promise<FlexComponent[]> {
    const text = token.text
    let size = "md"
    let paddingBottom = "sm"
    if (token.depth === 1) {
      size = "xl"
      paddingBottom = "lg"
    }
    else if (token.depth === 2) {
      size = "lg"
      paddingBottom = "md"
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
