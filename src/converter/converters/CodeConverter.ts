import { Tokens } from "marked"
import { FlexComponent } from "@line/bot-sdk"
import { FlexConverter } from "../../types"

export class CodeConverter implements FlexConverter {
  private readonly titleBackgroundColor = "#343548"
  private readonly titleTextColor = "#d9d9d8"
  private readonly codeBackgroundColor = "#18212c"
  private readonly codeTextColor = "#ffffff"

  async convert(token: Tokens.Code): Promise<FlexComponent[]> {
    const component: FlexComponent = {
      type: "box",
      layout: "vertical",
      backgroundColor: this.codeBackgroundColor,
      cornerRadius: "6px",
      contents: []
    }
    if (token.lang) {
      component.contents.push(this.getTitleComponent(token.lang))
    }
    component.contents.push(this.getCodeComponent(token.text))
    return [component]
  }
  getCodeComponent(text: string): FlexComponent {
    return {
      type: "box",
      layout: "vertical",
      paddingAll: "6px",
      contents: [
        {
          type: "text",
          text,
          size: "xs",
          wrap: true,
          color: this.codeTextColor,
        }
      ]
    }
  }
  getTitleComponent(text: string): FlexComponent {
    return {
      type: "box",
      layout: "vertical",
      contents: [
        {
          type: "text",
          text,
          color: this.titleTextColor,
          size: "xs"
        }
      ],
      backgroundColor: this.titleBackgroundColor,
      paddingTop: "3px",
      paddingBottom: "3px",
      paddingStart: "6px"
    }
  }
}
