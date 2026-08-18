import mongoose, { Schema } from "mongoose";

export interface IAgentSettings {
  blogsPerDay: number;
  minWords: number;
  maxWords: number;
  publishingTime: string;
  autoPublish: boolean;
  targetCountry: string;
  targetLanguage: string;
  targetAudience: string;
  websiteNiche: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const AgentSettingsSchema = new Schema<IAgentSettings>(
  {
    blogsPerDay: { type: Number, default: 10 },
    minWords: { type: Number, default: 1000 },
    maxWords: { type: Number, default: 2000 },
    publishingTime: { type: String, default: "09:00" },
    autoPublish: { type: Boolean, default: true },
    targetCountry: { type: String, default: "India" },
    targetLanguage: { type: String, default: "English" },
    targetAudience: { type: String, default: "Students, Career Switchers, Tech Professionals" },
    websiteNiche: { type: String, default: "IT Training, AI Engineering, Full-Stack Development, UI/UX Design, Placement Assistance" },
  },
  { timestamps: true }
);

export default mongoose.models.AgentSettings || mongoose.model<IAgentSettings>("AgentSettings", AgentSettingsSchema);
