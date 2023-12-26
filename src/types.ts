import { Token } from "marked"
import { FlexComponent, FlexSpan, FlexText } from "@line/bot-sdk"

export interface FlexConverter {
  convert(token: Token): FlexComponent[]
}

export type DecoratableFlex = FlexSpan | FlexText
