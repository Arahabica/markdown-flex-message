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
  async convert(token: Tokens.List): Promise<FlexComponent[]> {
    const components: FlexComponent[] = []
    const marginLeft = this.calculateMarginLeft(token)
    // token.items.forEach((item, index) => {
    let index = 0
    for (const item of token.items) {
      const contents = await this.inlineConverter.convert(item.tokens)
      const marker = this.generateMarker(token, index)
      const margin = index === 0 ? 'md' : undefined
      components.push({
        type: 'box',
        layout: 'horizontal',
        margin,
        contents: [
          marker,
          {
            type: 'box',
            layout: 'vertical',
            paddingStart: `${marginLeft}px`,
            contents
          }
        ]
      })
      index++
    }
    return components
  }
  private generateMarker(token: Tokens.List, index: number): FlexComponent {
    if (token.ordered) {
      const number = (token.start || 0) + index
      return this.generateOrderedMarker(token, number)
    } else {
      return this.generateUnorderedMarker()
    }
  }
  private generateUnorderedMarker(): FlexComponent {
    return {
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
  }
  private generateOrderedMarker(token: Tokens.List, index: number): FlexComponent {
    const width = this.calculateOrderedMarkerWidth(token)
    const lastDigit = index % 10
    // The positions of 1 and 7 are adjusted due to their narrow character widths.
    if ([1, 7].includes(lastDigit)) {
      const spacing = lastDigit === 1 ? '1px' : undefined
      return {
        type: 'box',
        layout: 'horizontal',
        width: `${width}px`,
        justifyContent: 'flex-end',
        spacing,
        contents: [
          {
            type: 'text',
            text: `${index}`,
            color: this.markerColor,
            flex: 0,
          },
          {
            type: 'text',
            text: '.',
            color: this.markerColor,
            flex: 0,
          }
        ]
      }
    }
    return {
      type: 'box',
      layout: 'vertical',
      width: `${width}px`,
      alignItems: 'flex-end',
      contents: [
        {
          type: 'text',
          text: `${index}.`,
          color: this.markerColor,
        }
      ]
    }
  }
  private calculateOrderedMarkerWidth(token: Tokens.List): number {
    const maxIndex = (token.start || 0) + token.items.length - 1
    const digit = maxIndex.toString().length
    return digit * 10 + 8
  }
  private calculateMarginLeft(token: Tokens.List): number {
    return token.ordered ? 8 : 12
  }
}
