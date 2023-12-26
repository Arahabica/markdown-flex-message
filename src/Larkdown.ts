import { MainConverter } from "./converter/MainConverter"
import { MarkDownParser } from "./parser/MarkDownParser"
import { FlexContainer } from "@line/bot-sdk"
import { FlexConverter } from "./types"

export type ConvertOptions = {
  size?: "nano" | "micro" | "kilo" | "mega" | "giga"
}

export class Larkdown {
  parser: MarkDownParser
  converter: FlexConverter

  constructor() {
    this.parser = new MarkDownParser()
    this.converter = new MainConverter()
  }
  convert(markdown: string, options: ConvertOptions = {}): FlexContainer {
    const flex: FlexContainer = {
      type: "bubble",
      size: this.getRootSize(options),
      body: {
        type: "box",
        layout: "vertical",
        paddingAll: "xl",
        contents: []
      }
    }
    const result = this.parser.parse(markdown)
    // console.log(JSON.stringify(result, null, 2))
    result.forEach((token) => {
      const contents = this.converter.convert(token)
      contents.forEach((content) => {
        flex.body?.contents.push(content)
      })
    })
    return flex
  }
  private getRootSize(options: ConvertOptions): "nano" | "micro" | "kilo" | "giga" | undefined {
    if (options.size === "mega") {
      return undefined
    } else if (options.size) {
      return options.size
    }
    return "giga"
  }
}

export const convert = (markdown: string): FlexContainer => {
  const larkdown = new Larkdown()
  return larkdown.convert(markdown)
}
