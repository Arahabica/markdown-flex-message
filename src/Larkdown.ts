import { MainConverter } from "./converter/MainConverter"
import { MarkDownParser } from "./parser/MarkDownParser"
import { FlexContainer } from "@line/bot-sdk"
import { FlexConverter } from "./types"

export class Larkdown {
  parser: MarkDownParser
  converter: FlexConverter

  constructor() {
    this.parser = new MarkDownParser()
    this.converter = new MainConverter()
  }
  convert(markdown: string): FlexContainer {
    const flex: FlexContainer = {
      type: "bubble",
      body: {
        type: "box",
        layout: "vertical",
        contents: []
      }
    }
    const result = this.parser.parse(markdown)
    result.forEach((token) => {
      const content = this.converter.convert(token)
      flex.body?.contents.push(content)
    })
    return flex
  }
}

export const convert = (markdown: string): FlexContainer => {
  const larkdown = new Larkdown()
  return larkdown.convert(markdown)
}
