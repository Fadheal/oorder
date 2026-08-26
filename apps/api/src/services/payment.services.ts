import midtransClient from "midtrans-client"

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY!,
  clientKey: process.env.MIDTRANS_CLIENT_KEY!,
})

export const PaymentServices = {
  async create({
    paymentId,
    amount,
  }: {
    paymentId: string
    amount: number
  }) {
    const transaction = await snap.createTransaction({
      transaction_details: {
        order_id: paymentId,
        gross_amount: amount,
      },
    })

    return {
      token: transaction.token,
      url: transaction.redirect_url,
    }
  },

  async getStatus(paymentId: string) {
    const serverKey = process.env.MIDTRANS_SERVER_KEY

    if (!serverKey) {
      throw new Error("midtrans_server_key_missing")
    }

    const auth = Buffer
      .from(`${serverKey}:`)
      .toString("base64")

    const response = await fetch(
      `https://api.sandbox.midtrans.com/v2/${paymentId}/status`,
      {
        headers: {
          Authorization: `Basic ${auth}`,
          Accept: "application/json",
        },
      }
    )

    if (!response.ok) {
      const error = await response.text()

      throw new Error(`midtrans_status_error: ${error}`)
    }

    return await response.json() as {
      order_id: string
      transaction_status:
        | "capture"
        | "settlement"
        | "pending"
        | "deny"
        | "cancel"
        | "expire"
        | "failure"
      fraud_status?: string
      gross_amount: string
    }
  },
}