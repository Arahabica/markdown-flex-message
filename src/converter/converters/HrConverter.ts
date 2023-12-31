import { Tokens } from "marked"
import { FlexComponent } from "@line/bot-sdk"
import { FlexConverter } from "../../types"

export class HrConverter implements FlexConverter {
  private readonly borderColor = "#e3e5ed"
  private readonly borderHeight = 2
  private readonly margin = 16

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async convert(_: Tokens.Hr): Promise<FlexComponent[]> {
    const { borderColor, borderHeight, margin } = this
    const component: FlexComponent = {
      type: 'box',
      layout: 'vertical',
      margin: `${margin}px`,
      contents: [
        {
          type: 'box',
          layout: 'horizontal',
          backgroundColor: borderColor,
          width: '100%',
          height: `${borderHeight}px`,
          cornerRadius: `${Math.floor(borderHeight * 0.5)}px`,
          contents: [],
        },
        {
          type: 'box',
          layout: 'horizontal',
          width: '100%',
          height: `${margin}px`,
          contents: [],
        },
      ]
    }
    return [component]
  }
}
