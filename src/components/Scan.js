import { useEffect, useState } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';

export default function ScanModule({ onScan }) {
  const [batch, setBatch] = useState([]);
  const rapidScan = ({ data }) => {
    const item = { barcode: data, timestamp: Date.now() };
    setBatch(b => [...b, item]);
    if (onScan) onScan(item);
  };
  const [hasPerm, setHasPerm] = useState(null);
  useEffect(() => { (async () => { const { status } = await Camera.requestCameraPermissionsAsync(); setHasPerm(status === 'granted'); })(); }, []);
  if (hasPerm === null) return null;
  if (hasPerm === false) return <Text>Camera permission required</Text>;
  return (
    <Camera style={{ flex: 1 }} onBarCodeScanned={onScan ? ({ data }) => onScan({ barcode: data }) : undefined}>
      <BarCodeScanner onBarCodeScanned={rapidScan ? ({ data }) => rapidScan({ data }) : undefined} style={{ flex: 1 }} />
    </Camera>
  );
}
