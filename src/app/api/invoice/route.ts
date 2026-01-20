import { orders } from "@/data/orders";
import { NextRequest, NextResponse } from "next/server";
import PDFDocument from "pdfkit";

export async function GET(req: NextRequest): Promise<Response> {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("id");

    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 }
      );
    }

    const order = orders.find((o) => o.id === orderId);

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    // Create PDF
    const doc = new PDFDocument();
    const chunks: Buffer[] = [];

    doc.on("data", (chunk: Buffer) => chunks.push(chunk));

    // Header
    doc.fontSize(20).font("Helvetica-Bold").text("📋 INVOICE", { align: "center" });
    doc.moveDown();

    doc.fontSize(12).font("Helvetica");
    doc.text(`Company: E-Shop`, { underline: true });
    doc.text(`Email: support@eshop.com`);
    doc.text(`Phone: +91-98765-43210`);
    doc.moveDown();

    // Order Details
    doc.fontSize(14).font("Helvetica-Bold").text("Order Details");
    doc.fontSize(11).font("Helvetica");
    doc.text(`Order ID: ${order.id}`);
    doc.text(`Date: ${order.date}`);
    doc.text(`Status: ${order.status}`);
    doc.moveDown();

    // Items Table
    doc.fontSize(12).font("Helvetica-Bold").text("Order Items");
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown();

    const tableTop = doc.y;
    let yPosition = tableTop;

    // Headers
    doc.font("Helvetica-Bold").fontSize(11);
    doc.text("Item", 50, yPosition);
    doc.text("Qty", 350, yPosition);
    doc.text("Price", 420, yPosition);
    doc.text("Total", 520, yPosition);
    yPosition += 20;
    doc.moveTo(50, yPosition).lineTo(550, yPosition).stroke();
    yPosition += 10;

    // Items
    doc.font("Helvetica").fontSize(10);
    let subtotal = 0;
    order.items.forEach((item) => {
      const itemTotal = item.price * item.qty;
      subtotal += itemTotal;

      doc.text(item.name, 50, yPosition, { width: 280 });
      doc.text(item.qty.toString(), 350, yPosition);
      doc.text(`₹${item.price.toLocaleString()}`, 420, yPosition);
      doc.text(`₹${itemTotal.toLocaleString()}`, 520, yPosition);
      yPosition += 25;
    });

    doc.moveTo(50, yPosition).lineTo(550, yPosition).stroke();
    yPosition += 15;

    // Totals
    doc.font("Helvetica-Bold").fontSize(11);
    const gst = Math.round(subtotal * 0.18);
    const total = subtotal + gst;

    doc.text("Subtotal:", 380, yPosition);
    doc.text(`₹${subtotal.toLocaleString()}`, 520, yPosition);
    yPosition += 20;

    doc.text("GST (18%):", 380, yPosition);
    doc.text(`₹${gst.toLocaleString()}`, 520, yPosition);
    yPosition += 20;

    doc.fontSize(12).text("Total Amount:", 380, yPosition);
    doc.text(`₹${total.toLocaleString()}`, 520, yPosition);
    yPosition += 30;

    // Footer
    doc.fontSize(10).font("Helvetica");
    doc.moveTo(50, yPosition).lineTo(550, yPosition).stroke();
    doc.text("Thank you for your purchase!", 50, yPosition + 15, {
      align: "center",
      width: 500,
    });
    doc.text("For support, contact: support@eshop.com", 50, yPosition + 35, {
      align: "center",
      width: 500,
      color: "#666666",
    });

    doc.end();

    return new Promise<Response>((resolve) => {
      doc.on("finish", () => {
        const pdfBuffer = Buffer.concat(chunks);
        resolve(
          new Response(pdfBuffer, {
            headers: {
              "Content-Type": "application/pdf",
              "Content-Disposition": `attachment; filename=invoice-${orderId}.pdf`,
            },
          })
        );
      });
    });
  } catch (error) {
    console.error("Invoice generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate invoice" },
      { status: 500 }
    );
  }
}
