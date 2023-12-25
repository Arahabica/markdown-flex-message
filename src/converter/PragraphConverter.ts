import { Token, Tokens } from "marked"
import { FlexComponent } from "@line/bot-sdk"
import { FlexConverter } from "../types"
import { MainConverter } from "./MainConverter"

export class ParagraphConverter implements FlexConverter {
  convert(token: Tokens.Paragraph): FlexComponent[] {
    const mainConverter = new MainConverter()
    const components: FlexComponent[] = []
    token.tokens.forEach(childToken => {
      const childComponents = mainConverter.convert(childToken)
      if (this.isInline(childToken)) {
        if (components.length === 0 || !this.isTextWithContents(components[components.length - 1])) {
          components.push({
            type: "text",
            wrap: true,
            contents: []
          })
        }
        if (components.length === 0) {
          throw new Error("components.length === 0")
        }
        const block = components[components.length - 1]
        if (block.type !== "text" || block.text || !block.contents) {
          throw new Error("block.type !== 'text' || block.text || !block.contents")
        }
        childComponents.forEach(component => {
          if (component.type !== "span") {
            throw new Error("component.type !== 'span'")
          }
          block.contents.push(component)
        })
      } else {
        childComponents.forEach(component => {
          components.push(component)
        })
      }
    })
    return components
  }
  private isTextWithContents(component: FlexComponent): boolean {
    return Boolean(component.type === "text" && !component.text && component.contents)
  }
  private isInline(token: Token): boolean {
    const inlineTypes = [
      "text",
      "strong",
      "em",
      "codespan",
      // "br",
      "del",
      "link",
      // "image",
      "text",
      // "html",
    ]
    return inlineTypes.includes(token.type)
  }
}
