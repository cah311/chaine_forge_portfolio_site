import { createHmac, timingSafeEqual } from "crypto";
import type { QuizAnswers } from "@/lib/quiz/scoring";
import type { QuizScore } from "@/lib/quiz/scoring";

export type QuizResultPayload = {
  email: string;
  answers: QuizAnswers;
  score: QuizScore;
  createdAt: string;
};

function secret() {
  return (
    process.env.QUIZ_RESULT_SECRET ||
    process.env.RESEND_API_KEY ||
    "chain-forge-dev-quiz-secret"
  );
}

function b64url(input: Buffer | string) {
  const buf = Buffer.isBuffer(input) ? input : Buffer.from(input, "utf8");
  return buf
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function fromB64url(input: string) {
  const pad = input.length % 4 === 0 ? "" : "=".repeat(4 - (input.length % 4));
  const normalized = input.replace(/-/g, "+").replace(/_/g, "/") + pad;
  return Buffer.from(normalized, "base64");
}

export function signQuizResult(payload: QuizResultPayload): string {
  const body = b64url(JSON.stringify(payload));
  const sig = createHmac("sha256", secret()).update(body).digest();
  return `${body}.${b64url(sig)}`;
}

export function verifyQuizResult(token: string): QuizResultPayload | null {
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expected = createHmac("sha256", secret()).update(body).digest();
  let actual: Buffer;
  try {
    actual = fromB64url(sig);
  } catch {
    return null;
  }
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) {
    return null;
  }
  try {
    const json = fromB64url(body).toString("utf8");
    return JSON.parse(json) as QuizResultPayload;
  } catch {
    return null;
  }
}
