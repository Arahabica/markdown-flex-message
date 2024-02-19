import { Tokens } from "marked"
import { FlexConverter, KnownFlexComponent } from "../../types"

export class SpaceConverter implements FlexConverter {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async convert(_: Tokens.Space): Promise<KnownFlexComponent[]> {
    return []
  }
}
