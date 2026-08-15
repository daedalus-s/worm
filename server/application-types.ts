export type ApplicationRecord = {
  id: string;
  company: string;
  role: string;
  jobDescription: string;
  generatedAt: string;
  keywords: string[];
  resumeTex: string;
  coverLetterTex: string;
  responseReceived: boolean;
  responseReceivedAt?: string;
  agentId?: string;
  runId?: string;
};
