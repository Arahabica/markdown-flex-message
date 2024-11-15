import { imageSize } from 'image-size'

export class ImageSizeScale {
  size(imageBuffer: Buffer): { width: number; height: number } {
    const { width, height } = imageSize(imageBuffer)
    if (!width || !height) {
      throw new Error('Image size is invalid')
    }
    return { width, height }
  }
}
