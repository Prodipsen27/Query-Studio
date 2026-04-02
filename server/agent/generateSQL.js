import OpenAI from "openai";
import dotenv from "dotenv";
import DB_SCHEMA from "./schema.js";

dotenv.config();

const token = process.env.GITHUB_TOKEN;
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4o-mini";


const openai = new OpenAI({
    baseURL: endpoint,
    apiKey: token,
  });

/**
 * Converts a natural language question into a SQL query using GPT-4o
 * @param {string} userQuestion - The user's natural language question
 * @returns {string} - A valid PostgreSQL SELECT query
 */
const generateSQL = async (userQuestion) => {
  const response = await openai.chat.completions.create({
    model: model,
    temperature: 0,  // 0 = deterministic, important for SQL generation
    messages: [
      {
        role: "system",
        content: DB_SCHEMA,
      },
      {
        role: "user",
        content: userQuestion,
      },
    ],
  });

  const rawSql = response.choices[0].message.content.trim();
  
  // Clean SQL: remove markdown backticks and extra whitespace
  const cleanSql = rawSql
    .replace(/^```sql/i, "")
    .replace(/^```/i, "")
    .replace(/```$/i, "")
    .trim();

  return cleanSql;
};


export default generateSQL;