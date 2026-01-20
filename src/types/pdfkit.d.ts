declare module "pdfkit" {
  class PDFDocument extends NodeJS.EventEmitter {
    y: number;
    constructor(options?: any);
    fontSize(size: number): this;
    font(font: string): this;
    text(text: string, options?: any): this;
    text(text: string, x: number, y: number, options?: any): this;
    text(text: number, x: number, y: number, options?: any): this;
    moveDown(lines?: number): this;
    moveTo(x: number, y: number): this;
    lineTo(x: number, y: number): this;
    stroke(): this;
    end(): void;
    on(event: string, callback: (...args: any[]) => void): this;
  }

  export = PDFDocument;
}
