import { Token } from 'marked'
import { FlexConverter, KnownFlexComponent } from '../types'
import { ConverterFactory } from './ConverterFactory'

export class MainConverter implements FlexConverter {
  factory: ConverterFactory
  constructor() {
    this.factory = new ConverterFactory()
  }
  async convert(token: Token): Promise<KnownFlexComponent[]> {
    const converter = this.factory.create(token)
    return converter.convert(token)
  }
}
