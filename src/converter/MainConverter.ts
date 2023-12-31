import { Token } from "marked"
import { FlexComponent } from "@line/bot-sdk"
import { FlexConverter } from "../types"
import { ConverterFactory } from "./ConverterFactory"

export class MainConverter implements FlexConverter {
  factory: ConverterFactory
  constructor() {
    this.factory = new ConverterFactory()
  }
  async convert(token: Token): Promise<FlexComponent[]> {
    const converter = this.factory.create(token)
    return converter.convert(token)
  }
}
