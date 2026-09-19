import { nearbyFor } from './db';

export async function compareNearby(barcode, lat, lng) {
  const rows = await nearbyFor(barcode);
  return rows.sort((a, b) => a.price - b.price);
}
