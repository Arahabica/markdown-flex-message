import { Token } from "marked"
import { FlexComponent } from "@line/bot-sdk"

export interface FlexConverter {
  convert(token: Token): FlexComponent
}
