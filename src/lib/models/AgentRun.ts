import mongoose, { Schema } from "mongoose";

export interface IAgentRun {
  date: string; // YYYY-MM-DD format
  startedAt: Date;
  completedAt?: Date;
  topicsSelected: string[];
  blogsGenerated: number;
  blogsPublished: number;
  blogsFailed: number;
  status: "running" | "completed" | "failed";
  logs: string[];
  errors: string[];
}

const AgentRunSchema = new Schema<IAgentRun>(
  {
    date: { type: String, required: true },
    startedAt: { type: Date, default: Date.now },
    completedAt: { type: Date },
    topicsSelected: [{ type: String }],
    blogsGenerated: { type: Number, default: 0 },
    blogsPublished: { type: Number, default: 0 },
    blogsFailed: { type: Number, default: 0 },
    status: { type: String, enum: ["running", "completed", "failed"], default: "running" },
    logs: [{ type: String }],
    errors: [{ type: String }],
  },
  { 
    timestamps: true,
    suppressReservedKeysWarning: true 
  }
);

export default mongoose.models.AgentRun || mongoose.model<IAgentRun>("AgentRun", AgentRunSchema);
