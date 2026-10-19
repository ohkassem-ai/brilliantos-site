// Passcode gate for /preview and its assistant API (/api/msaaed). Runs before the CDN cache.
// Set PREVIEW_PASSCODE in the Vercel project. Changing it signs everyone out.
// Visitors enter the passcode once (or open /preview?code=<passcode>); a secure cookie keeps them in for 30 days.
import { next } from "@vercel/functions";
import { createHmac, timingSafeEqual } from "node:crypto";

export const config = { runtime: "nodejs", matcher: ["/preview", "/preview/:path*", "/api/msaaed"] }; // Node runtime: node:crypto

const COOKIE = "__Host-pv";
const DAYS = 30;
const tokenFor = code => createHmac("sha256", code).update("brilliantdevcorp-preview-v1").digest("base64url");
const same = (a, b) => { const x = Buffer.from(a), y = Buffer.from(b); return x.length === y.length && timingSafeEqual(x, y); };
const cookie = (req, name) => { for (const part of (req.headers.get("cookie") || "").split(/;\s*/)) { const i = part.indexOf("="); if (i > 0 && part.slice(0, i) === name) return part.slice(i + 1); } return ""; };
const page = (status, msg = "") => new Response(LOGIN.replace("<!--MSG-->", msg), { status, headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store", "x-robots-tag": "noindex, nofollow" } });
const pause = ms => new Promise(r => setTimeout(r, ms));

export default async function middleware(request) {
  const url = new URL(request.url), code = process.env.PREVIEW_PASSCODE || "", isApi = url.pathname.startsWith("/api/");
  if (!code) return isApi ? Response.json({ error: "This preview is not open yet." }, { status: 503 }) : page(503, MSG.closed);
  const want = tokenFor(code);
  if (same(cookie(request, COOKIE), want)) return next();
  if (isApi) return Response.json({ error: "Enter the passcode on the preview page first." }, { status: 401, headers: { "cache-control": "no-store" } });

  // passcode from the form, or from a shared link /preview?code=...
  let given = url.searchParams.get("code");
  if (request.method === "POST") { try { given = String((await request.formData()).get("passcode") || ""); } catch { given = ""; } }
  if (given != null) {
    if (same(tokenFor(given.trim()), want)) {
      const back = new URL("/preview/", url);
      return new Response(null, { status: 303, headers: { location: back.pathname, "cache-control": "no-store", "set-cookie": `${COOKIE}=${want}; Path=/; Max-Age=${DAYS * 86400}; HttpOnly; Secure; SameSite=Lax` } });
    }
    await pause(800); // slows guessing
    return page(401, MSG.wrong);
  }
  return page(401);
}

const MSG = {
  wrong: `<p class="err" role="alert">That passcode is not right. <span lang="ar" dir="rtl">رمز الدخول غير صحيح.</span></p>`,
  closed: `<p class="err" role="alert">This preview is not open yet. <span lang="ar" dir="rtl">هذه المعاينة غير متاحة بعد.</span></p>`,
};
const LOGIN = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex, nofollow"><title>9FA Reliability Workbench · Private preview</title><link rel="icon" href="/favicon.svg">
<style>
:root{--bg:#eef0ee;--card:#fff;--fg:#1b2229;--muted:#56616a;--line:#d6dbdd;--accent:#b9631a;--ink:#fff;--err:#962020;--err-bg:#f5d2d2;color-scheme:light}
@media (prefers-color-scheme:dark){:root{--bg:#14181c;--card:#1d2329;--fg:#e6eaed;--muted:#a3adb5;--line:#323b43;--accent:#e3903c;--ink:#1b1206;--err:#f07a7a;--err-bg:#3f1c1c;color-scheme:dark}}
*{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;padding:24px 16px;background:var(--bg);color:var(--fg);font:15px/1.5 system-ui,-apple-system,"Segoe UI",Tahoma,sans-serif}
main{width:min(420px,100%);background:var(--card);border:1px solid var(--line);border-radius:10px;padding:26px 24px}
.eyebrow{font:600 11px/1 ui-monospace,Consolas,monospace;letter-spacing:.1em;text-transform:uppercase;color:var(--accent)}
h1{font-size:20px;margin:8px 0 6px}p{margin:0 0 6px;color:var(--muted)}[lang=ar]{display:block;font-family:"Segoe UI",Tahoma,sans-serif}
label{display:block;font-weight:600;margin:16px 0 6px}input{width:100%;font:inherit;font-size:16px;padding:10px 12px;border:1px solid var(--line);border-radius:7px;background:var(--card);color:var(--fg)}
button{margin-top:12px;width:100%;font:inherit;font-weight:600;padding:10px 12px;border:0;border-radius:7px;background:var(--accent);color:var(--ink);cursor:pointer}
input:focus-visible,button:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.err{color:var(--err);background:var(--err-bg);border-radius:6px;padding:8px 10px;margin-top:12px}
</style></head><body><main>
<div class="eyebrow">Brilliant Dev Corp · private preview</div>
<h1>9FA Reliability Workbench</h1>
<p>This preview is private. Enter the passcode you were given.<span lang="ar" dir="rtl">هذه المعاينة خاصة. أدخل رمز الدخول الذي أُرسل إليك.</span></p>
<!--MSG-->
<form method="post" action="/preview"><label for="pc">Passcode <span lang="ar" dir="rtl" style="display:inline">رمز الدخول</span></label>
<input id="pc" name="passcode" type="password" autocomplete="current-password" required autofocus>
<button type="submit">Open the preview · فتح المعاينة</button></form>
</main></body></html>`;
