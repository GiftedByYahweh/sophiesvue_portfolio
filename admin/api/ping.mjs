export default function handler(req, res) {
  res.statusCode = 200;
  res.setHeader("content-type", "application/json");
  res.end(JSON.stringify({ url: req.url, headers: req.headers }, null, 2));
}
