// Msaaed (مساعد): the maintenance assistant on /preview. Logic lives in _msaaed-core.js.
// Needs the Vercel environment variable ANTHROPIC_API_KEY. Optional MSAAED_CODE: then only visitors who open
// the page with #k=<code> in the link can ask questions. Optional ANTHROPIC_WORKSPACE_ID: needed only when the key
// is an organization key that is not scoped to a workspace (the API then asks which workspace to bill).
import Anthropic from "@anthropic-ai/sdk";
import { makeHandler } from "./_msaaed-core.js";

let client;
const workspace = (process.env.ANTHROPIC_WORKSPACE_ID || "").trim();
// the function is stopped after 60 s (vercel.json), so one attempt with a 55 s limit (Claude Opus 5.5 can take 10-30 s).
// The page asks for a streamed answer: the handler writes it with res.write as Claude writes it (Node.js functions stream).
export const config = { supportsResponseStreaming: true };
export default makeHandler(() => (client ||= new Anthropic({ timeout: 55_000, maxRetries: 0, ...(workspace ? { defaultHeaders: { "anthropic-workspace-id": workspace } } : {}) })));
