export default function handler(_req, res) {
  const now = new Date();
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.status(200).json({
    status: "ok",
    service: "webchatsales",
    timestamp: now.toISOString(),
    epoch_ms: now.getTime(),
    uptime_s: typeof process !== "undefined" && process.uptime ? Math.floor(process.uptime()) : null
  });
}
