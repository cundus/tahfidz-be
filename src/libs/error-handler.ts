export function sendError(res, message, status = 500) {
  res.status(status).json({ error: message });
}
