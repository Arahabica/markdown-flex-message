import { Tokens } from "marked"
import { FlexComponent } from "@line/bot-sdk"
import { FlexConverter } from "../../types"

export class HrConverter implements FlexConverter {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async convert(_: Tokens.Hr): Promise<FlexComponent[]> {
    return [{
      type: 'separator',
      margin: 'md'
    }]
  }
}
