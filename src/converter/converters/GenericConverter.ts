import { Token } from 'marked'
import { FlexConverter, KnownFlexComponent } from '../../types'

export class GenericConverter implements FlexConverter {
  async convert(token: Token): Promise<KnownFlexComponent[]> {
    const text = token.raw
    return [
      {
        type: 'text',
        text,
        wrap: true,
      },
    ]
  }
}
