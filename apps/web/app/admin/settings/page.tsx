"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import SidebarAdmin from "../components/Sidebar"
import Topbar from "../components/Topbar"

import { Button } from "@/components/ui/button"
import { CopyIcon, DownloadIcon } from "lucide-react"

import QRCode from "qrcode"
import { jsPDF } from "jspdf"
import { useEffect, useState } from "react"

function Page() {
  const [qrCode, setQrCode] = useState<string>("")
  const [copied, setCopied] = useState(false)
  const [orderUrl, setOrderUrl] = useState("")

  useEffect(() => {
    setOrderUrl(`${window.location.origin}/order`)
  }, [])

  async function generateQr() {
    const qr = await QRCode.toDataURL(orderUrl, {
      width: 800,
      margin: 2,
    })

    setQrCode(qr)
  }

  async function copyLink() {
    await navigator.clipboard.writeText(orderUrl)

    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 1500)
  }

  function downloadPdf() {
    if (!qrCode) return

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    })

    const pageWidth = pdf.internal.pageSize.getWidth()

    pdf.setFont("helvetica", "bold")
    pdf.setFontSize(26)

    pdf.text(
      "Scan Me To Order",
      pageWidth / 2,
      45,
      {
        align: "center",
      }
    )

    pdf.setFont("helvetica", "normal")
    pdf.setFontSize(11)

    pdf.text(
      "Scan this QR code to open the menu and place your order.",
      pageWidth / 2,
      55,
      {
        align: "center",
      }
    )

    pdf.addImage(
      qrCode,
      "PNG",
      pageWidth / 2 - 45,
      70,
      90,
      90
    )

    pdf.setFontSize(10)

    pdf.text(
      orderUrl,
      pageWidth / 2,
      175,
      {
        align: "center",
      }
    )

    pdf.setFontSize(10)

    pdf.text(
      "Powered by Oorder",
      pageWidth / 2,
      190,
      {
        align: "center",
      }
    )

    pdf.save("oorder-qr-code.pdf")
  }

  return (
    <SidebarProvider>
      <SidebarAdmin activated={5} />

      <main className="min-h-screen w-full bg-accent">
        <Topbar />

        <div className="p-12">
          <section className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                QR Code
              </h1>

              <p className="text-muted-foreground">
                Share your ordering page with customers.
              </p>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              <div className="flex min-h-[360px] flex-col justify-between rounded-2xl border bg-background p-6 shadow-sm">
                <div className="space-y-4">
                  <div>
                    <h2 className="text-lg font-semibold">
                      Ordering QR Code
                    </h2>

                    <p className="mt-1 max-w-md text-sm text-muted-foreground">
                      Customers scan this QR code to open your menu
                      and place an order.
                    </p>
                  </div>

                  <div className="overflow-hidden rounded-lg border bg-muted px-3 py-2">
                    <code className="block truncate text-sm">
                      {orderUrl}
                    </code>
                  </div>
                </div>

                <div className="mt-8 space-y-2">
                  <Button
                    className="h-11 w-full rounded-xl"
                    onClick={generateQr}
                  >
                    {qrCode
                      ? "Regenerate QR-Code"
                      : "Generate QR-Code"}
                  </Button>

                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      className="h-11 rounded-xl"
                      variant="outline"
                      disabled={!qrCode}
                      onClick={downloadPdf}
                    >
                      <DownloadIcon className="size-4" />
                      Download PDF
                    </Button>

                    <Button
                      className="h-11 rounded-xl"
                      variant="outline"
                      onClick={copyLink}
                    >
                      <CopyIcon className="size-4" />

                      {copied
                        ? "Copied"
                        : "Copy Link"}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex min-h-[360px] items-center justify-center gap-12 rounded-2xl border bg-white p-8 shadow-sm">
                <div className="flex size-64 shrink-0 items-center justify-center rounded-2xl border bg-accent p-5">
                  {qrCode ? (
                    <img
                      src={qrCode}
                      alt="Oorder QR Code"
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <p className="text-center text-sm text-muted-foreground">
                      Generate QR-Code
                    </p>
                  )}
                </div>

                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold tracking-tight">
                      Scan Me To Order
                    </h2>

                    <p className="mt-1 text-muted-foreground">
                      Open the menu and order directly.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <p className="text-xs text-muted-foreground">
                      Powered By
                    </p>

                    <h2 className="text-xl font-bold">
                      <span className="text-green-600">
                        O
                      </span>
                      order
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </SidebarProvider>
  )
}

export default Page