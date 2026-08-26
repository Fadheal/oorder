type CreatePaymentInput = {
  orderId: string
  amount: number
}

export const PaymentServices = {
  async createSession({
    orderId,
    amount,
  }: CreatePaymentInput) {
    const auth = Buffer
      .from(`${process.env.XENDIT_SECRET_KEY}:`)
      .toString("base64")

    const response = await fetch(
      "https://api.xendit.co/sessions",
      {
        method: "POST",

        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          reference_id: orderId,
          session_type: "PAY",
          mode: "PAYMENT_LINK",
          amount,
          currency: "IDR",
          country: "ID",

          description: `Payment for order ${orderId}`,

          components_configuration: {
            return_url:
            `${process.env.FRONTEND_URL}/order/payment`
          }
        })
      }
    )

    if (!response.ok) {
      const error = await response.text()

      throw new Error(
        `xendit_payment_failed: ${error}`
      )
    }

    return response.json() as Promise<{
      payment_session_id: string
      payment_link_url: string
      reference_id: string
      status: string
    }>
  }
}