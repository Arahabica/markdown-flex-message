import { Tokens } from "marked"
import { FlexComponent } from "@line/bot-sdk"
import { FlexConverter } from "../../types"

export class SpaceConverter implements FlexConverter {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async convert(_: Tokens.Space): Promise<FlexComponent[]> {
    return []
  }
}
