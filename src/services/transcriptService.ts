import { Message } from 'discord.js';
import PDFDocument from 'pdfkit';

export const transcriptService = {
  /**
   * Generates a beautifully formatted PDF transcript buffer of the channel messages.
   */
  async generatePdfTranscript(
    channelName: string,
    messages: Message[],
    applicantTag: string,
    staffTag: string,
    status: 'Accepted' | 'Rejected' | 'Cancelled',
    createdTimestamp: number,
  ): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({ margin: 50 });
        const chunks: Buffer[] = [];

        doc.on('data', (chunk) => chunks.push(chunk));
        doc.on('end', () => resolve(Buffer.concat(chunks)));
        doc.on('error', (err) => reject(err));

        // Title Header
        doc.fontSize(18).font('Helvetica-Bold').text('Star Syndrome', { align: 'left' });
        doc
          .fontSize(12)
          .font('Helvetica-Bold')
          .text('Guild Recruitment Transcript', { align: 'left' });
        doc.moveDown(0.5);

        // Separator
        doc.fontSize(10).font('Helvetica').text('----------------------------------');
        doc.moveDown(0.5);

        // Metadata block matching requirements
        const createdDate = new Date(createdTimestamp).toLocaleString();
        const closedDate = new Date().toLocaleString();

        doc.fontSize(10).font('Helvetica-Bold').text('Applicant');
        doc.font('Helvetica').text(applicantTag);
        doc.moveDown(0.3);

        doc.font('Helvetica-Bold').text('Handled By');
        doc.font('Helvetica').text(staffTag);
        doc.moveDown(0.3);

        doc.font('Helvetica-Bold').text('Status');
        doc.font('Helvetica').text(status);
        doc.moveDown(0.3);

        doc.font('Helvetica-Bold').text('Created');
        doc.font('Helvetica').text(createdDate);
        doc.moveDown(0.3);

        doc.font('Helvetica-Bold').text('Closed');
        doc.font('Helvetica').text(closedDate);
        doc.moveDown(0.5);

        // Separator
        doc.font('Helvetica').text('----------------------------------');
        doc.moveDown(0.5);

        // Conversation Header
        doc.fontSize(12).font('Helvetica-Bold').text('Conversation');
        doc.moveDown(0.8);

        // Sort messages ascending by time
        const sorted = [...messages].sort((a, b) => a.createdTimestamp - b.createdTimestamp);

        for (const msg of sorted) {
          // Format time as [HH:MM]
          const msgTime = new Date(msg.createdTimestamp);
          const hour = String(msgTime.getHours()).padStart(2, '0');
          const minute = String(msgTime.getMinutes()).padStart(2, '0');
          const timeStr = `[${hour}:${minute}]`;

          // Format:
          // [HH:MM]
          // Author
          // Content
          doc.fontSize(10).font('Helvetica-Bold').text(timeStr);
          doc.font('Helvetica-Bold').text(msg.author.tag);

          if (msg.content && msg.content.trim() !== '') {
            doc.font('Helvetica').text(msg.content);
          }

          // Attachments check
          if (msg.attachments.size > 0) {
            for (const [, attachment] of msg.attachments) {
              doc.font('Helvetica-Oblique').text(`📎 ${attachment.name}`);
            }
          }

          doc.moveDown(0.4);
          doc.font('Helvetica').text('----------------------------------');
          doc.moveDown(0.5);
        }

        doc.end();
      } catch (error) {
        reject(error);
      }
    });
  },
};
