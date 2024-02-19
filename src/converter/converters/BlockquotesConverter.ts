import { Tokens } from "marked"
import { FlexConverter, KnownFlexComponent } from "../../types"
import { MainConverter } from "../MainConverter"

export class BlockquoteConverter implements FlexConverter {
  private readonly borderColor = "#abafb9"
  private readonly textColor = "#666979"
  private readonly borderWidth = "3px"

  async convert(token: Tokens.Blockquote): Promise<KnownFlexComponent[]> {
    const mainConverter = new MainConverter()
    const childContents: KnownFlexComponent[] = []
    for(const childToken of token.tokens) {
      const contents = await mainConverter.convert(childToken)
      childContents.push(...contents)
    }
    childContents.forEach(content => {
      if (content.type === 'text' && content.color === undefined) {
        content.color = this.textColor
      }
    })
    const component: KnownFlexComponent = {
      type: 'box',
      layout: 'horizontal',
      backgroundColor: this.borderColor,
      margin: 'md',
      contents: [
        {
          type: 'box',
          layout: 'vertical',
          width: this.borderWidth,
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
