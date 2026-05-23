export default function handler(_req, res) {
  res.statusCode = 503;
  res.end("API bundle missing — vercel-build did not run");
}
