import { Token } from 'marked'
import { MainConverter } from '../MainConverter'
import { KnownFlexComponent } from '../../types'

export class InlineConverter {
  async convert(tokens: Token[]): Promise<KnownFlexComponent[]> {
    const mainConverter = new MainConverter()
    const components: KnownFlexComponent[] = []
    for (const childToken of tokens) {
      const childComponents = await mainConverter.convert(childToken)
      if (this.isInline(childToken)) {
        childComponents.forEach((component) => {
          if (component.type === 'span') {
            if (
              components.length === 0 ||
              !this.isTextWithContents(components[components.length - 1])
            ) {
              components.push({
                type: 'text',
                wrap: true,
                contents: [],
              })
            }
            // Type Guard for avoiding type error
            if (components.length === 0) {
              throw new Error('components.length === 0')
            }
            const block = components[
              components.length - 1
            ] as KnownFlexComponent
            // Type Guard for avoiding type error
            if (block.type !== 'text' || block.text || !block.contents) {
              throw new Error(
                "block.type !== 'text' || block.text || !block.contents",
              )
            }
            // Prevent extra line breaks
            if (block.contents.length === 0) {
              component.text = (component.text || '').replace(/^\n/, '')
            }
            block.contents.push(component)
          } else {
            components.push(component)
          }
        })
      } else {
        childComponents.forEach((component) => {
          components.push(component)
        })
      }
    }
    return components
  }
  private isTextWithContents(component: KnownFlexComponent): boolean {
    return Boolean(
      component.type === 'text' && !component.text && component.contents,
    )
  }
  private isInline(token: Token): boolean {
    const inlineTypes = ['text', 'strong', 'em', 'codespan', 'del', 'text']
    return inlineTypes.includes(token.type)
  }
}
