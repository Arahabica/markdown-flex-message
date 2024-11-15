import { Tokens } from 'marked'
import { FlexConverter, KnownFlexComponent } from '../../types'
import { MainConverter } from '../MainConverter'

export class TextConverter implements FlexConverter {
  async convert(token: Tokens.Text): Promise<KnownFlexComponent[]> {
    if (token.tokens) {
      const promises = token.tokens.map((childToken) => {
        const mainConverter = new MainConverter()
        return mainConverter.convert(childToken)
      })
      const groups = await Promise.all(promises)
      return groups.reduce((a, b) => a.concat(b), [])
    }
    const text = token.raw.replace(/\n\n$/, '\n')
    return [
      {
        type: 'span',
        text,
      },
    ]
  }
}
