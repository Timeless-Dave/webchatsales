const SAFE_ENV_KEYS = [
  "NEXT_PUBLIC_SITE_URL",
  "PLAUSIBLE_DOMAIN",
  "NEXT_PUBLIC_VERCEL_ENV",
  "VERCEL",
  "VERCEL_ENV",
  "VERCEL_GIT_COMMIT_SHA",
  "VERCEL_GIT_COMMIT_MESSAGE",
  "VERCEL_URL"
];

function pickSafeEnv() {
  const out = {};
  for (const k of SAFE_ENV_KEYS) out[k] = process.env[k];
  return out;
}

export default function handler(_req, res) {
  const now = new Date();
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.status(200).json({
    status: "ok",
    service: "webchatsales",
    timestamp: now.toISOString(),
    commit: process.env.VERCEL_GIT_COMMIT_SHA || "unknown",
    env: pickSafeEnv(),
    uptime_s: typeof process !== "undefined" && process.uptime ? Math.floor(process.uptime()) : null
  });
}
