/**
 * Validates the AI-generated SQL before running it on the database.
 * This is a critical security layer — never run raw LLM output directly!
 */

const FORBIDDEN_KEYWORDS = [
  "DELETE",
  "DROP",
  "INSERT",
  "UPDATE",
  "ALTER",
  "TRUNCATE",
  "CREATE",
  "GRANT",
  "REVOKE",
  "EXEC",
  "EXECUTE",
];

const validateSQL = (sql) => {
  if (!sql || typeof sql !== "string") {
    return { valid: false, error: "Empty or invalid SQL generated." };
  }

  const upperSQL = sql.toUpperCase();

  // Must start with SELECT
  if (!upperSQL.trimStart().startsWith("SELECT")) {
    return {
      valid: false,
      error: "Only SELECT queries are allowed.",
    };
  }

  // Check for forbidden keywords
  for (const keyword of FORBIDDEN_KEYWORDS) {
    const regex = new RegExp(`\\b${keyword}\\b`);
    if (regex.test(upperSQL)) {
      return {
        valid: false,
        error: `Forbidden keyword detected: ${keyword}`,
      };
    }
  }

  return { valid: true };
};

export default validateSQL;