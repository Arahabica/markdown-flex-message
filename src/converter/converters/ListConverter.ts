import { Tokens } from "marked"
import { FlexComponent } from "@line/bot-sdk"
import { FlexConverter } from "../../types"
import { InlineConverter } from "./InlineConverter"

export class ListConverter implements FlexConverter {
  private readonly markerColor = "#666979"
  private readonly dotRadius = 2
  private readonly inlineConverter: InlineConverter

  constructor() {
    this.inlineConverter = new InlineConverter()
  }
  convert(token: Tokens.List): FlexComponent[] {
    const components:FlexComponent[] = []
    token.items.forEach(item => {
      const contents = this.inlineConverter.convert(item.tokens)
      const marker: FlexComponent = {
        type: 'box',
        layout: 'vertical',
        width: `${this.dotRadius * 2}px`,
        height: `${this.dotRadius * 2}px`,
        backgroundColor: this.markerColor,
        cornerRadius: `${this.dotRadius}px`,
        offsetTop: '12px',
        offsetStart: '4px',
        contents: []
      }
      components.push({
        type: 'box',
        layout: 'horizontal',
        contents: [
          marker,
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
