import { Tokens } from "marked"
import { FlexComponent } from "@line/bot-sdk"
import { FlexConverter } from "../../types"
import { MainConverter } from "../MainConverter"

export class BlockquoteConverter implements FlexConverter {
  private readonly color = "#dadadf"

  convert(token: Tokens.Blockquote): FlexComponent[] {
    const mainConverter = new MainConverter()
    const childContents: FlexComponent[] = []
    token.tokens.forEach(childToken => {
      const contents = mainConverter.convert(childToken)
      childContents.push(...contents)
    })
    const component: FlexComponent = {
      type: 'box',
      layout: 'horizontal',
      backgroundColor: this.color,
      margin: 'md',
      contents: [
        {
          type: 'box',
          layout: 'vertical',
          width: '4px',
          contents: []
        },
        {
          type: 'box',
          layout: 'vertical',
          paddingTop: '4px',
          paddingBottom: '4px',
          paddingStart: '8px',
          backgroundColor: '#ffffff',
          contents: childContents
        }
      ]
    }
    return [component]
  }
}
