import { Larkdown, convert } from '../Larkdown'
import { it, describe, expect } from 'vitest'

describe('Larkdown', () => {
  describe('Larkdown#convert', () => {
    it('should return an array of tokens', () => {
      const larkdown = new Larkdown()
      const flexContainer = larkdown.convert('Hello world')
      // console.log(JSON.stringify(flexContainer, null, 2))
      expect(flexContainer.type).toEqual('bubble')
      expect(flexContainer).toEqual({
        "type": "bubble",
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "Hello world"
            }
          ]
        }
      })
    })
  })
})
describe('convert', () => {
  it('ok', () => {
    const flexContainer = convert('Hello world')
    console.log(JSON.stringify(flexContainer, null, 2))
    expect(flexContainer).toEqual({
      type: "bubble",
      body: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: "Hello world"
          }
        ]
      }
    })
  })
  it('headers', () => {
    const markdown = `
# Sample
## Sample
Hello **world** !
    `.trim()
    const flexContainer = convert(markdown)
    // console.log(JSON.stringify(flexContainer, null, 2))

    expect(flexContainer).toEqual({
      type: "bubble",
      body: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "text",
                text: "Sample",
                weight: "bold",
                size: "xl"
              }
            ],
            paddingBottom: "xl"
          },
          {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "text",
                text: "Sample",
                weight: "bold",
                size: "lg"
              }
            ],
            paddingBottom: "lg"
          },
          {
            type: "text",
            text: "Hello **world** !"
          }
        ]
      }
    })
  })
})
