import { Tokens } from "marked"
import { FlexComponent } from "@line/bot-sdk"
import { FlexConverter } from "../../types"
import { InlineConverter } from "./InlineConverter"

export class TableConverter implements FlexConverter {
  private inlineConverter: InlineConverter
  private headerRatio = 1
  private bodyRatio = 2

  constructor() {
    this.inlineConverter = new InlineConverter()
  }

  async convert(token: Tokens.Table): Promise<FlexComponent[]> {
    const contents: FlexComponent[] = []
    let rowIndex: number = 0
    const aligns = token.align
    for (const row of token.rows) {
      contents.push({
        type: 'separator',
        margin: 'md'
      })
      const rowComponent: FlexComponent = {
        type: 'box',
        layout: 'vertical',
        spacing: 'sm',
        contents: []
      }
      let cellIndex: number = 0
      for (const cell of row) {
        const align = aligns[cellIndex] || ''
        const headerCell = await this.headerCell(token.header[cellIndex])
        const bodyCell = await this.bodyCell(cell, align)
        const cellComponent: FlexComponent = {
          type: 'box',
          layout: 'horizontal',
          spacing: 'md',
          contents: [headerCell, bodyCell]
        }
        rowComponent.contents.push(cellComponent)
        cellIndex++
      }
      contents.push(rowComponent)
      if (rowIndex === token.rows.length - 1) {
        contents.push({
          type: 'separator',
          margin: 'md',
        })
      }
      rowIndex++
    }
    return contents
  }
  private async headerCell(cell: Tokens.TableCell | undefined): Promise<FlexComponent> {
    const tokens = cell?.tokens || []
    const contents = await this.inlineConverter.convert(tokens)
    for (const content of contents) {
      if (content.type === 'text' && content.weight === undefined) {
        content.weight = 'bold'
      }
    }
    if (contents.length === 1 && contents[0].type === 'text') {
      const content = contents[0]
      content.flex = this.headerRatio
      return content
    }
    return {
      type: 'box',
      layout: 'vertical',
      flex: this.headerRatio,
      contents
    }
  }
  private async bodyCell(cell: Tokens.TableCell | undefined, align: string): Promise<FlexComponent> {
    const tokens = cell?.tokens || []
    const contents = await this.inlineConverter.convert(tokens)
    for (const content of contents) {
      if (align && content.type === 'text' && content.align === undefined) {
        content.align = this.convertAlign(align)
      }
    }
    if (contents.length === 1 && contents[0].type === 'text') {
      const content = contents[0]
      content.flex = this.bodyRatio
      return content
    }
    return {
      type: 'box',
      layout: 'vertical',
      flex: this.bodyRatio,
      contents
    }
  }
  private convertAlign(align: string): "center" | "start" | "end" | undefined {
    switch (align) {
    case 'center':
      return 'center'
    case 'right':
      return 'end'
    default:
      return 'start'
    }
  }
}
