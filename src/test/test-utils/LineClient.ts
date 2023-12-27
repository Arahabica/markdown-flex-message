import { Message } from "@line/bot-sdk"

type LineClientConfig = {
  channelAccessToken: string
}

type ApiResponseSuccess = {
  status: 'success'
}
type ApiResponseFailure = {
  status: 'failure'
  statusCode: number
  error: ErrorMessage
}
type ErrorDetail = {
  message: string
  property: string
}
type ErrorMessage = {
  message: string
  details?: ErrorDetail[]
}
type ValidateReplyMessagesResponse = ApiResponseSuccess | ApiResponseFailure

export class LineClient {
  private readonly endpoint = 'https://api.line.me/v2/bot'
  private readonly config: LineClientConfig

  constructor(config: LineClientConfig) {
    this.config = config
  }
  async validateReplyMessages(messages: Message[]): Promise<ValidateReplyMessagesResponse> {
    const { endpoint } = this
    const { channelAccessToken } = this.config
    const url = `${endpoint}/message/validate/reply`
    const headers = {
      'Authorization': `Bearer ${channelAccessToken}`,
      'Content-Type': 'application/json'
    }
    const body = {
      messages: messages
    }
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    })
    if (response.status === 200) {
      return { status: 'success' }
    }
    const statusCode = response.status
    const json: ErrorMessage = await response.json()
    return { status: 'failure', statusCode, error: json }
  }
}
