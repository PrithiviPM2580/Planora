import { z } from "zod";
import APIError from "@/lib/api-error.lib.js";

export function formatIssues(issues: z.ZodError["issues"]) {
  return issues.map((issue) => ({
    field: issue.path.join("."),
    message: issue.message,
  }));
}

export default function validate<T>(schema: z.ZodType<T>, config: unknown): T {
  const parsedData = schema.safeParse(config);

  if (!parsedData.success) {
    const issues = formatIssues(parsedData.error.issues);
    throw new APIError(400, "Validation Error", true, {
      type: "ValidationError",
      details: issues,
    });
  }

  return parsedData.data;
}
