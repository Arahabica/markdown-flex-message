import { Tokens } from "marked"
import { MainConverter } from "./MainConverter"
import { messagingApi } from "@line/bot-sdk"
import { DecoratableFlex, KnownFlexComponent } from "../types"

export class TextListDecorator {
  async decorate(
    token: Tokens.Strong | Tokens.Generic,
    decorate: (span: DecoratableFlex) => void)
  : Promise<KnownFlexComponent[]> {
    const mainConverter = new MainConverter()
    if (!token.tokens) {
      const text = token.text
      const span: messagingApi.FlexSpan = {
        type: "span",
        text
      }
      decorate(span)
      return [span]
    }
    const components: KnownFlexComponent[] = []
    for (const childToken of token.tokens) {
      const childComponents = await mainConverter.convert(childToken)
      childComponents.forEach(component => {
        if (component.type === "span" || component.type === "text") {
          decorate(component)
        } else if ('contents' in component && component.contents) {
          (component.contents as KnownFlexComponent[]).forEach(span => {
            if (span.type === "span") {
              decorate(span)
            }
          })
        }
        components.push(component)
      })
    }
    return components
  }
}
