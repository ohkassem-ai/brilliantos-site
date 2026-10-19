// Msaaed (مساعد): the maintenance assistant on /preview. Logic lives in _msaaed-core.js.
// Needs the Vercel environment variable ANTHROPIC_API_KEY. Optional MSAAED_CODE: then only visitors who open
// the page with #k=<code> in the link can ask questions.
import Anthropic from "@anthropic-ai/sdk";
import { makeHandler } from "./_msaaed-core.js";

let client;
// the function is stopped after 30 s (vercel.json), so one attempt with a 25 s limit
export default makeHandler(() => (client ||= new Anthropic({ timeout: 25_000, maxRetries: 0 })));
