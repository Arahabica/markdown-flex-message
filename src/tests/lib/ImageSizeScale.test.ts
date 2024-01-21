import { it, describe, expect } from 'vitest'
import { ImageSizeScale } from '../../lib/ImageSizeScale'

describe('ImageSizeScale', () => {
  describe('size', () => {
    it('jpg', async () => {
      const imageUrl = "https://via.placeholder.com/400x100/79b74a/fff.jpg/?text=line-markdown"
      const res = await fetch(imageUrl)
      const arrayBuffer = await res.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      const scale = new ImageSizeScale()
      const size = scale.size(buffer)
      expect(size).toEqual({ width: 400, height: 100 })
    })
    it('pdf', async () => {
      const imageUrl = "https://www.africau.edu/images/default/sample.pdf"
      const res = await fetch(imageUrl)
      const arrayBuffer = await res.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      let error: Error | undefined = undefined
      const scale = new ImageSizeScale()
      try {
        scale.size(buffer)
      } catch (e) {
        error = e as Error
      }
      expect(error).toBeTruthy()
    })
  })
})
