import OpenAI from "openai";

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_SECRET_KEY || "default_key"
});

export interface CancellationStrategy {
  channel: string;
  steps: string[];
  estimatedTimeMinutes: number;
  successProbability: number;
  riskFactors: string[];
}

export interface CancellationAnalysis {
  merchantName: string;
  difficulty: number;
  recommendedStrategies: CancellationStrategy[];
  frictionPoints: string[];
  evidenceRequirements: string[];
  notes: string;
}

// Analyze merchant and generate cancellation strategy
export async function analyzeCancellationStrategy(
  merchantName: string,
  category: string,
  userContext?: any
): Promise<CancellationAnalysis> {
  try {
    const prompt = `
You are an expert AI agent specializing in subscription cancellation strategies. Analyze the following merchant and provide a comprehensive cancellation strategy.

Merchant: ${merchantName}
Category: ${category}
User Context: ${JSON.stringify(userContext || {})}

Provide a detailed analysis in JSON format with the following structure:
{
  "merchantName": "${merchantName}",
  "difficulty": (number 1-5, where 5 is most difficult),
  "recommendedStrategies": [
    {
      "channel": "portal|email|chat|phone|letter",
      "steps": ["step 1", "step 2", ...],
      "estimatedTimeMinutes": (number),
      "successProbability": (decimal 0.0-1.0),
      "riskFactors": ["risk 1", "risk 2", ...]
    }
  ],
  "frictionPoints": ["known friction point 1", "friction point 2", ...],
  "evidenceRequirements": ["screenshot", "email confirmation", "call recording", ...],
  "notes": "Additional strategic notes and warnings"
}

Consider factors like:
- Known cancellation policies for this merchant
- Common retention tactics
- Required documentation or proof
- Multi-step processes
- Customer service availability
- Legal requirements (cooling-off periods, etc.)
`;

    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content: "You are an expert subscription cancellation strategist. Provide detailed, actionable cancellation strategies in JSON format."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return result as CancellationAnalysis;
  } catch (error) {
    throw new Error("Failed to analyze cancellation strategy: " + (error as Error).message);
  }
}

// Generate context-aware communication for cancellation attempts
export async function generateCancellationCommunication(
  channel: "email" | "chat" | "phone",
  merchantName: string,
  userInfo: any,
  step: string
): Promise<string> {
  try {
    const prompt = `
Generate professional cancellation communication for the following context:

Channel: ${channel}
Merchant: ${merchantName}
User Info: ${JSON.stringify(userInfo)}
Current Step: ${step}

Generate appropriate ${channel} communication that:
- Is polite but firm
- Clearly states cancellation intent
- Provides necessary account information
- Avoids retention attempts
- Follows best practices for this merchant

Return only the communication text, no additional formatting.
`;

    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content: "You are an expert at crafting effective subscription cancellation communications. Be direct, professional, and persistent."
        },
        {
          role: "user",
          content: prompt
        }
      ],
    });

    return response.choices[0].message.content || "";
  } catch (error) {
    throw new Error("Failed to generate cancellation communication: " + (error as Error).message);
  }
}

// Analyze cancellation success and generate evidence summary
export async function analyzeCancellationEvidence(
  evidenceData: any[]
): Promise<{
  isSuccessful: boolean;
  confidence: number;
  summary: string;
  missingEvidence: string[];
}> {
  try {
    const prompt = `
Analyze the following cancellation evidence and determine if the cancellation was successful:

Evidence: ${JSON.stringify(evidenceData)}

Provide analysis in JSON format:
{
  "isSuccessful": (boolean),
  "confidence": (decimal 0.0-1.0),
  "summary": "Brief summary of evidence quality and cancellation status",
  "missingEvidence": ["list of any missing evidence types"]
}

Look for:
- Confirmation numbers or IDs
- Email confirmations
- Screenshots of cancellation pages
- Call recordings with verbal confirmation
- Documented refund promises
- End-of-service dates
`;

    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content: "You are an expert at analyzing subscription cancellation evidence. Be thorough and accurate in your assessment."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return result;
  } catch (error) {
    throw new Error("Failed to analyze cancellation evidence: " + (error as Error).message);
  }
}
