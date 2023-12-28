import { MainConverter } from "./converter/MainConverter"
import { MarkDownParser } from "./parser/MarkDownParser"
import { FlexBubble, FlexMessage } from "@line/bot-sdk"
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
  convertToFlexMessage(
    markdown: string,
    altText: string,
    options: ConvertOptions = {}
  ): FlexMessage {
    const contents: FlexBubble = this.convertToFlexBubble(markdown, options)
    return {
      type: "flex",
      altText,
      contents
    }
  }
  convertToFlexBubble(markdown: string, options: ConvertOptions = {}): FlexBubble {
    const flex: FlexBubble = {
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
        const simplifiedContent = JSON.parse(JSON.stringify(content))
        flex.body?.contents.push(simplifiedContent)
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

export const convertToFlexMessage = (
  markdown: string,
  altText: string,
  options: ConvertOptions = {}
): FlexMessage => {
  const larkdown = new Larkdown()
  return larkdown.convertToFlexMessage(markdown, altText, options)
}

export const convertToFlexBubble = (markdown: string, options: ConvertOptions = {}): FlexBubble => {
  const larkdown = new Larkdown()
  return larkdown.convertToFlexBubble(markdown, options)
}
