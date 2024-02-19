import { Tokens } from "marked"
import { FlexConverter, KnownFlexComponent } from "../../types"

export class LinkConverter implements FlexConverter {
  async convert(token: Tokens.Link): Promise<KnownFlexComponent[]> {
    const { href, text } = token
    return [{
      type: 'text',
      text,
      decoration: "underline",
      color: "#0c93e4",
      action: {
        type: "uri",
        label: text,
        uri: href,
      },
    }]
  }
}
