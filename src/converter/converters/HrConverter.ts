import { Tokens } from 'marked'
import { FlexConverter, KnownFlexComponent } from '../../types'

export class HrConverter implements FlexConverter {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async convert(_: Tokens.Hr): Promise<KnownFlexComponent[]> {
    return [
      {
        type: 'separator',
        margin: 'md',
      },
    ]
  }
}
