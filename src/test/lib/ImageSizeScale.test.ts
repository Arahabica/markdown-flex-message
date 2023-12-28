import { it, describe, expect } from 'vitest'
import { ImageSizeScale } from '../../lib/ImageSizeScale'

describe('ImageSizeScale', () => {
  it('size', async () => {
    const imageUrl = "https://via.placeholder.com/400x100/79b74a/fff.jpg/?text=Larkdown"
    const res = await fetch(imageUrl)
    const arrayBuffer = await res.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const scale = new ImageSizeScale()
    const size = scale.size(buffer)
    expect(size).toEqual({ width: 400, height: 100 })
  })
})
