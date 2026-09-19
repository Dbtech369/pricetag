import { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import ScanModule from './components/Scan';
import HistoryChart from './components/HistoryChart';
import { initDB, logPrice, historyFor } from './lib/db';
import { shouldAlert } from './lib/alert';
import { compareNearby } from './lib/nearby';

export default function App() {
  const [barcode, setBarcode] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => { initDB(); }, []);

  const handleScan = async ({ barcode }) => {
    setBarcode(barcode);
    const h = await historyFor(barcode);
    setHistory(h);
    // demo log entry
    await logPrice({ barcode, product_name: 'Item', price: 9.99, store: 'Target', date: new Date().toISOString(), lat: 0, lng: 0 });
    setHistory(await historyFor(barcode));
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24 }}>PriceTag MVP</Text>
      <ScanModule onScan={handleScan} />
      {barcode && <Text>Barcode: {barcode}</Text>}
      <HistoryChart data={history} />
    </View>
  );
}
