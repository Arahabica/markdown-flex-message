import { MainConverter } from "./converter/MainConverter"
import { MarkDownParser } from "./markdown/MarkDownParser"
import { FlexBox, FlexBubble, FlexMessage } from "@line/bot-sdk"
import { FlexConverter } from "./types"

export type ConvertOptions = {
  size?: "nano" | "micro" | "kilo" | "mega" | "giga"
}

/**
 * line-markdown is a converter that transforms Markdown into Flex Message for the LINE Messaging API.
 */
export class LineMarkdown {
  parser: MarkDownParser
  converter: FlexConverter

  constructor() {
    this.parser = new MarkDownParser()
    this.converter = new MainConverter()
  }
  /**
   * Convert markdown text to flex message
   * @param {string} markdown Markdown text
   * @param {string|undefined} altText Alternative text for flex message. Default is 'markdown'.
   * @param {ConvertOptions|undefined} options Options for flex message
   * @params {string|undefined} options.size Size of flex message. Default is 'giga'.
   * 
   * @returns {Promise<FlexMessage>} [Flex message](https://developers.line.biz/en/reference/messaging-api/#flex-message)
   */
  async convertToFlexMessage(
    markdown: string,
    altText: string = 'markdown',
    options: ConvertOptions = {}
  ): Promise<FlexMessage> {
    const contents: FlexBubble = await this.convertToFlexBubble(markdown, options)
    return {
      type: "flex",
      altText,
      contents
    }
  }
  /**
   * Convert markdown text to flex bubble object
   * @param {string} markdown Markdown text
   * @param {ConvertOptions|undefined} options Options for flex message
   * @params {string|undefined} options.size Size of flex message. Default is 'giga'.
   * 
   * @returns {Promise<FlexBubble>} [Flex Bubble](https://developers.line.biz/en/reference/messaging-api/#bubble)
   */
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
  /**
   * Convert markdown text to flex bubble object
   * @param {string} markdown Markdown text
   * @returns {Promise<FlexBox>} [Flex box](https://developers.line.biz/en/reference/messaging-api/#box)
   */
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

/**
 * Convert markdown text to flex message
 * @param {string} markdown Markdown text
 * @param {string|undefined} altText Alternative text for flex message. Default is 'markdown'.
 * @param {ConvertOptions|undefined} options Options for flex message
 * @params {string|undefined} options.size Size of flex message. Default is 'giga'.
 * 
 * @returns {Promise<FlexMessage>} [Flex message](https://developers.line.biz/en/reference/messaging-api/#flex-message)
 */
export const convertToFlexMessage = (
  markdown: string,
  altText: string = 'markdown',
  options: ConvertOptions = {}
): Promise<FlexMessage> => {
  const lineMarkdown = new LineMarkdown()
  return lineMarkdown.convertToFlexMessage(markdown, altText, options)
}

/**
 * Convert markdown text to flex bubble object
 * @param {string} markdown Markdown text
 * @param {ConvertOptions|undefined} options Options for flex message
 * @params {string|undefined} options.size Size of flex message. Default is 'giga'.
 * 
 * @returns {Promise<FlexBubble>} [Flex Bubble](https://developers.line.biz/en/reference/messaging-api/#bubble)
 */
export const convertToFlexBubble = (markdown: string, options: ConvertOptions = {}): Promise<FlexBubble> => {
  const lineMarkdown = new LineMarkdown()
  return lineMarkdown.convertToFlexBubble(markdown, options)
}

/**
 * Convert markdown text to flex bubble object
 * @param {string} markdown Markdown text
 * 
 * @returns {Promise<FlexBox>} [Flex box](https://developers.line.biz/en/reference/messaging-api/#box)
 */
export const convertToFlexBox = (markdown: string): Promise<FlexBox> => {
  const lineMarkdown = new LineMarkdown()
  return lineMarkdown.convertToFlexBox(markdown)
}
