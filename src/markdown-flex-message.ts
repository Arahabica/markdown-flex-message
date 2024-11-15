import { MarkdownFlexMessage } from './MarkdownFlexMessage'
import { messagingApi } from '@line/bot-sdk'
import { TextType, ConvertOptions, ConvertFlexMessageOptions } from './types'

export { MarkdownFlexMessage }
/**
 * Convert markdown text to flex message
 * @param {string} markdown Markdown text
 * @param {ConvertOptions|undefined} options Options for flex message
 * @params {string|undefined} options.altText Alternative text for flex message. If not specified, it becomes the first 100 characters of the Markdown text.
 * @params {string|undefined} options.size Size of flex message. Default is 'giga'.
 *
 * @returns {Promise<messagingApi.FlexMessage>} [Flex message](https://developers.line.biz/en/reference/messaging-api/#flex-message)
 */
export const convertToFlexMessage = (
  markdown: string,
  options: ConvertFlexMessageOptions = {},
): Promise<{ flexMessage: messagingApi.FlexMessage; textType: TextType }> => {
  const markdownFlexMessage = new MarkdownFlexMessage()
  return markdownFlexMessage.convertToFlexMessage(markdown, options)
}

/**
 * Convert markdown text to flex bubble object
 * @param {string} markdown Markdown text
 * @param {ConvertOptions|undefined} options Options for flex message
 * @params {string|undefined} options.size Size of flex message. Default is 'giga'.
 *
 * @returns {Promise<messagingApi.FlexBubble>} [Flex Bubble](https://developers.line.biz/en/reference/messaging-api/#bubble)
 */
export const convertToFlexBubble = (
  markdown: string,
  options: ConvertOptions = {},
): Promise<{ flexBubble: messagingApi.FlexBubble; textType: TextType }> => {
  const markdownFlexMessage = new MarkdownFlexMessage()
  return markdownFlexMessage.convertToFlexBubble(markdown, options)
}

/**
 * Convert markdown text to flex bubble object
 * @param {string} markdown Markdown text
 *
 * @returns {Promise<{ flexBox: messagingApi.FlexBox, textType: TextType }>} [Flex box](https://developers.line.biz/en/reference/messaging-api/#box)
 */
export const convertToFlexBox = (
  markdown: string,
): Promise<{ flexBox: messagingApi.FlexBox; textType: TextType }> => {
  const markdownFlexMessage = new MarkdownFlexMessage()
  return markdownFlexMessage.convertToFlexBox(markdown)
}
