import { Tokens } from "marked"
import { FlexComponent } from "@line/bot-sdk"
import { FlexConverter } from "../../types"
import { InlineConverter } from "./InlineConverter"

export class ListConverter implements FlexConverter {
  private readonly dotColor = "#abafb9"
  private readonly dotRadius = 3
  private readonly inlineConverter: InlineConverter

  constructor() {
    this.inlineConverter = new InlineConverter()
  }
  convert(token: Tokens.List): FlexComponent[] {
    const components:FlexComponent[] = []
    token.items.forEach(item => {
      const contents = this.inlineConverter.convert(item.tokens)
      const dot: FlexComponent = {
        type: 'box',
        layout: 'vertical',
        width: `${this.dotRadius}px`,
        height: `${this.dotRadius}px`,
        backgroundColor: this.dotColor,
        cornerRadius: `${this.dotRadius}px`,
        offsetTop: '12px',
        offsetStart: '4px',
        contents: []
      }
      components.push({
        type: 'box',
        layout: 'horizontal',
        contents: [
          dot,
          {
            type: 'box',
            layout: 'vertical',
            paddingStart: '12px',
            contents
          }
        ]
      })
    })
    return components
  }
}
