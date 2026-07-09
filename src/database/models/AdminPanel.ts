import mongoose, { Document, Schema } from 'mongoose';

export interface IAdminPanel extends Document {
  messageId: string;
  channelId: string;
  guildId: string;
  createdAt: Date;
  updatedAt: Date;
}

const adminPanelSchema = new Schema<IAdminPanel>(
  {
    messageId: { type: String, required: true },
    channelId: { type: String, required: true },
    guildId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Prevent overwriting the model if it has already been compiled
export const AdminPanelModel = mongoose.models.AdminPanel || mongoose.model<IAdminPanel>('AdminPanel', adminPanelSchema);
