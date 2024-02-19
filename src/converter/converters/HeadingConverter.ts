import { Tokens } from "marked"
import { FlexConverter, KnownFlexComponent } from "../../types"

export class HeadingConverter implements FlexConverter {
  async convert(token: Tokens.Heading | Tokens.Generic): Promise<KnownFlexComponent[]> {
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
    const component: KnownFlexComponent = {
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
