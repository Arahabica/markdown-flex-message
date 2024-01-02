import { MainConverter } from "./converter/MainConverter"
import { MarkDownParser } from "./markdown/MarkDownParser"
import { FlexBox, FlexBubble, FlexMessage } from "@line/bot-sdk"
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
  async convertToFlexMessage(
    markdown: string,
    altText: string,
    options: ConvertOptions = {}
  ): Promise<FlexMessage> {
    const contents: FlexBubble = await this.convertToFlexBubble(markdown, options)
    return {
      type: "flex",
      altText,
      contents
    }
  }
  async convertToFlexBubble(markdown: string, options: ConvertOptions = {}): Promise<FlexBubble> {
    const body = await this.convertToFlexBox(markdown)
    return {
      type: "bubble",
      size: this.getRootSize(options),
      styles: {
        body: {
          separator: true
        }
      },
      body
    }
  }
  async convertToFlexBox(markdown: string): Promise<FlexBox> {
    const box: FlexBox = {
      type: "box",
      layout: "vertical",
      paddingAll: "xl",
      spacing: "md",
      contents: []
    }
    const result = this.parser.parse(markdown)
    for (const token of result) {
      const contents = await this.converter.convert(token)
      for (const content of contents) {
        const simplifiedContent = JSON.parse(JSON.stringify(content))
        box.contents.push(simplifiedContent)
      }
    }
    return box
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
): Promise<FlexMessage> => {
  const larkdown = new Larkdown()
  return larkdown.convertToFlexMessage(markdown, altText, options)
}

export const convertToFlexBubble = (markdown: string, options: ConvertOptions = {}): Promise<FlexBubble> => {
  const larkdown = new Larkdown()
  return larkdown.convertToFlexBubble(markdown, options)
}

export const convertToFlexBox = (markdown: string): Promise<FlexBox> => {
  const larkdown = new Larkdown()
  return larkdown.convertToFlexBox(markdown)
}
