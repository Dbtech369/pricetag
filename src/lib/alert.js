export function shouldAlert(lastPrice, newPrice, threshold = 0.1) {
  if (!lastPrice || !newPrice) return false;
  return (lastPrice - newPrice) / lastPrice >= threshold;
}
