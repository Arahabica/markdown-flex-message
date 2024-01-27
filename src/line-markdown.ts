import { MainConverter } from "./converter/MainConverter"
import { MarkDownParser } from "./markdown/MarkDownParser"
import { FlexBox, FlexBubble, FlexMessage } from "@line/bot-sdk"
import { FlexConverter, TextType } from "./types"

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
  ): Promise<{flexMessage: FlexMessage, textType: TextType}> {
    const { flexBubble, textType } = await this.convertToFlexBubble(markdown, options)
    const flexMessage: FlexMessage = {
      type: "flex",
      altText,
      contents: flexBubble
    }
    return { flexMessage, textType }
  }
  /**
   * Convert markdown text to flex bubble object
   * @param {string} markdown Markdown text
   * @param {ConvertOptions|undefined} options Options for flex message
   * @params {string|undefined} options.size Size of flex message. Default is 'giga'.
   * 
   * @returns {Promise<FlexBubble>} [Flex Bubble](https://developers.line.biz/en/reference/messaging-api/#bubble)
   */
  async convertToFlexBubble(markdown: string, options: ConvertOptions = {}):
   Promise<{flexBubble: FlexBubble, textType: TextType}> {
    const { flexBox, textType } = await this.convert(markdown)
    if (textType === 'code') {
      flexBox.paddingAll = 'none'
    } else {
      flexBox.paddingAll = 'xl'
    }
    const flexBubble: FlexBubble = {
      type: "bubble",
      size: this.getRootSize(options),
      styles: {
        body: {
          separator: true
        }
      },
      body: flexBox
    }
    return { flexBubble, textType }
  }
  /**
   * Convert markdown text to flex bubble object
   * @param {string} markdown Markdown text
   * @returns {Promise<FlexBox>} [Flex box](https://developers.line.biz/en/reference/messaging-api/#box)
   */
  async convertToFlexBox(markdown: string): Promise<{ flexBox: FlexBox, textType: TextType }> {
    const { flexBox, textType } = await this.convert(markdown)
    flexBox.paddingAll = 'none'
    return { flexBox, textType }
  }
  private async convert(markdown: string): Promise<{ flexBox: FlexBox, textType: TextType }> {
    const flexBox: FlexBox = {
      type: "box",
      layout: "vertical",
      spacing: "md",
      contents: []
    }
    const { tokensList, textType } = this.parser.parse(markdown)
    for (const token of tokensList) {
      const contents = await this.converter.convert(token)
      for (const content of contents) {
        const simplifiedContent = JSON.parse(JSON.stringify(content))
        flexBox.contents.push(simplifiedContent)
      }
    }
    return { flexBox, textType }
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
): Promise<{flexMessage: FlexMessage, textType: TextType}> => {
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
export const convertToFlexBubble = (markdown: string, options: ConvertOptions = {})
  : Promise<{ flexBubble: FlexBubble, textType: TextType }> => {
  const lineMarkdown = new LineMarkdown()
  return lineMarkdown.convertToFlexBubble(markdown, options)
}

/**
 * Convert markdown text to flex bubble object
 * @param {string} markdown Markdown text
 * 
 * @returns {Promise<{ flexBox: FlexBox, textType: TextType }>} [Flex box](https://developers.line.biz/en/reference/messaging-api/#box)
 */
export const convertToFlexBox = (markdown: string)
  : Promise<{ flexBox: FlexBox, textType: TextType }> => {
  const lineMarkdown = new LineMarkdown()
  return lineMarkdown.convertToFlexBox(markdown)
}
