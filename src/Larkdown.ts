import { MarkDownParser } from "./lib/MarkDownParser"
import { FlexContainer } from "@line/bot-sdk"

export class Larkdown {
  parser: MarkDownParser
  constructor() {
    this.parser = new MarkDownParser()
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
      if (token.type === 'heading') {
        const text = token.text
        let size = "md"
        let paddingBottom = "md"
        if (token.depth === 1) {
          size = "xl"
          paddingBottom = "xl"
        } else if (token.depth === 2) {
          size = "lg"
          paddingBottom = "lg"
        }
        flex.body?.contents.push({
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "text",
              text,
              weight: "bold",
              size
            }
          ],
          paddingBottom
        })
      } else {
        const text = token.raw
        flex.body?.contents.push({
          type: 'text',
          text,
        })
      }
    })
    return flex
  }
}

export const convert = (markdown: string): FlexContainer => {
  const larkdown = new Larkdown()
  return larkdown.convert(markdown)
}
