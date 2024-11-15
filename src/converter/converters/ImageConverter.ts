import { Tokens } from 'marked'
import { messagingApi } from '@line/bot-sdk'
import { FlexConverter, KnownFlexComponent } from '../../types'
import { ImageSizeScale } from '../../lib/ImageSizeScale'

export class ImageConverter implements FlexConverter {
  private readonly imageSizeScale: ImageSizeScale

  constructor() {
    this.imageSizeScale = new ImageSizeScale()
  }

  async convert(token: Tokens.Image): Promise<KnownFlexComponent[]> {
    const url = token.href
    const aspectRatio = await this.calulateAspectRatio(url)
    const component: messagingApi.FlexImage = {
      type: 'image',
      url,
      aspectRatio,
      size: 'full',
      // margin: 'md',
    }
    return [component]
  }
  private async calulateAspectRatio(imageUrl: string): Promise<string> {
    try {
      const { width, height } = await this.calculateSize(imageUrl)
      const ratio = `${width}:${height}`
      return this.simplifyRatio(ratio)
    } catch (e) {
      console.warn(e)
      return '20:13'
    }
  }
  private async calculateSize(
    imageUrl: string,
  ): Promise<{ width: number; height: number }> {
    const res = await fetch(imageUrl)
    const arrayBuffer = await res.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const size = this.imageSizeScale.size(buffer)
    return size
  }
  private simplifyRatio(ratio: string): string {
    const [x, y] = ratio.split(':').map(Number)
    const gcd = this.greatestCommonDivisor(x, y)
    return `${x / gcd}:${y / gcd}`
  }
  // greatest common divisor
  private greatestCommonDivisor(x: number, y: number): number {
    return x % y ? this.greatestCommonDivisor(y, x % y) : y
  }
}
