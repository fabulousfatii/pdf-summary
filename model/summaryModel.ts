import { model, Schema, models } from "mongoose";

export interface ISummary extends Document {
    userid: string;
    fileName: string;
    fileUrl: string;
    summaryText: string;
    title: string;
}

const SummarySchema = new Schema<ISummary>({
    userid: { type: String, required: true },
    fileName: { type: String, required: true },
    fileUrl: { type: String, required: true },
    summaryText: { type: String, required: true },
    title: { type: String, required: true },
}, {
    timestamps: true
});

// Check if the model already exists to prevent recompilation errors
export const summaryModel = models.Summary || model<ISummary>("Summary", SummarySchema);
