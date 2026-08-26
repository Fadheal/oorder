type CreatePaymentInput = {
  orderId: string
  amount: number
}

type XenditSession = {
  payment_session_id: string
  payment_link_url: string
  reference_id: string
  status: string
}

export const PaymentServices = {
  async create({
    orderId,
    amount,
  }: CreatePaymentInput): Promise<XenditSession> {
    const secretKey = process.env.XENDIT_SECRET_KEY

    if (!secretKey) {
      throw new Error("xendit_secret_key_missing")
    }

    const authorization = Buffer
      .from(`${secretKey}:`)
      .toString("base64")

    const response = await fetch(
      "https://api.xendit.co/sessions",
      {
        method: "POST",

        headers: {
          Authorization: `Basic ${authorization}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          reference_id: orderId,

          session_type: "PAY",
          mode: "PAYMENT_LINK",

          amount,
          currency: "IDR",
          country: "ID",

          description: `Oorder #${orderId}`,

          success_return_url:
            `${process.env.FRONTEND_URL}/order/${orderId}`,

          cancel_return_url:
            `${process.env.FRONTEND_URL}/order/${orderId}`,
        }),
      }
    )

    if (!response.ok) {
      const error = await response.text()

      throw new Error(`xendit_error: ${error}`)
    }

    const data = await response.json() as XenditSession

    return data
  },
}