import { Tokens } from "marked"
import { FlexSpan, FlexText } from "@line/bot-sdk"
import { CodeHighlightTheme, FlexConverter, KnownFlexComponent } from "../../types"
import { CodeParser } from "../../code/CodeParser"

export class CodeConverter implements FlexConverter {
  private readonly parser: CodeParser
  private readonly theme: CodeHighlightTheme

  constructor(parser: CodeParser, theme: CodeHighlightTheme) {
    this.parser = parser
    this.theme = theme
  }

  async convert(token: Tokens.Code): Promise<KnownFlexComponent[]> {
    const component: KnownFlexComponent = {
      type: "box",
      layout: "vertical",
      backgroundColor: this.theme.codeBackgroundColor,
      cornerRadius: "6px",
      contents: []
    }
    if (token.lang) {
      component.contents.push(this.getTitleComponent(token.lang))
    }
    const codeComponent = await this.getCodeComponent(token.text, token.lang)
    component.contents.push(codeComponent)
    return [component]
  }
  async getCodeComponent(text: string, language: string | undefined): Promise<KnownFlexComponent> {
    const box: KnownFlexComponent = {
      type: "box",
      layout: "vertical",
      paddingAll: "6px",
      contents: []
    }
    if (!language) {
      box.contents.push(this.simpleCodeTextComponent(text))
      return box
    }
    try {
      const spans = await this.getTokenComponents(text, language)
      box.contents.push(this.highlitedCodeTextComponent(spans))
    } catch (error) {
      console.warn(error)
      box.contents.push(this.simpleCodeTextComponent(text))
    }
    return box
  }
  private async getTokenComponents(text: string, language: string): Promise<FlexSpan[]> {
    const components: FlexSpan[] = []
    const tokens = await this.parser.parse(text, language)
    tokens.forEach((token) => {
      const style = this.theme.highlight(token)
      let color: string | undefined = style.color
      if (style.opacity !== undefined) {
        const baseColor = color || this.theme.codeTextColor
        const opacityHex = Math.round(style.opacity * 255).toString(16)
        color = `${baseColor}${opacityHex}`
      }
      components.push({
        type: "span",
        text: token.text,
        color,
        weight: style.fontWeight,
        style: style.fontStyle
      })
    })
    return components
  }
  private simpleCodeTextComponent(text: string): FlexText {
    return {
      type: "text",
      text,
      size: "xs",
      wrap: true,
      color: this.theme.codeTextColor
    }
  }
  private highlitedCodeTextComponent(spans: FlexSpan[]): FlexText {
    return {
      type: "text",
      size: "xs",
      wrap: true,
      color: this.theme.codeTextColor,
      contents: spans
    }
  }
  private getTitleComponent(text: string): KnownFlexComponent {
    return {
      type: "box",
      layout: "vertical",
      contents: [
        {
          type: "text",
          text,
          color: this.theme.titleTextColor,
          size: "xs"
        }
      ],
      backgroundColor: this.theme.titleBackgroundColor,
      paddingTop: "3px",
      paddingBottom: "3px",
      paddingStart: "6px"
    }
  }
}
