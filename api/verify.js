export default function handler(req, res) {
  // Allow the browser to call this endpoint
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const { password } = req.body || {};

  // Secrets come from Vercel Environment Variables — NOT stored in this file
  if (password === process.env.CORRECT_PASSWORD) {
    return res.status(200).json({
      ok: true,
      next: process.env.NEXT_QR_PASSWORD,
    });
  }

  return res.status(200).json({ ok: false });
}