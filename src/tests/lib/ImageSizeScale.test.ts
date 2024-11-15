import { it, describe, expect } from 'vitest'
import { ImageSizeScale } from '../../lib/ImageSizeScale'

describe('ImageSizeScale', () => {
  describe('size', () => {
    it('png', async () => {
      const imageUrl =
        'https://raw.githubusercontent.com/Arahabica/markdown-flex-message/main/docs/images/markdown-flex-message.png'
      const res = await fetch(imageUrl)
      const arrayBuffer = await res.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      const scale = new ImageSizeScale()
      const size = scale.size(buffer)
      expect(size).toEqual({ width: 1695, height: 1695 })
    })
    it('pdf', async () => {
      const imageUrl =
        'https://www.kansaigaidai.ac.jp/asp/img/pdf/82/7a79c35f7ce0704dec63be82440c8182.pdf'
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
