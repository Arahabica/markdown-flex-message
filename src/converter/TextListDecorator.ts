import { Tokens } from "marked"
import { MainConverter } from "./MainConverter"
import { FlexComponent, FlexSpan } from "@line/bot-sdk"
import { DecoratableFlex } from "../types"

export class TextListDecorator {
  decorate(token: Tokens.Strong | Tokens.Generic, decorate: (span: DecoratableFlex) => void): FlexComponent[] {
    const mainConverter = new MainConverter()
    if (!token.tokens) {
      const text = token.text
      const span: FlexSpan = {
        type: "span",
        text
      }
      decorate(span)
      return [span]
    }
    const components: FlexComponent[] = []
    token.tokens.forEach(token => {
      const childComponents = mainConverter.convert(token)
      childComponents.forEach(component => {
        if (component.type === "span" || component.type === "text") {
          decorate(component)
        } else if ('contents' in component && component.contents) {
          component.contents.forEach(span => {
            if (span.type === "span") {
              decorate(span)
            }
          })
        }
        components.push(component)
      })
    })
    return components
  }
}
