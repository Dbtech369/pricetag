import { View, Text } from 'react-native';
export default function HistoryChart({ data }) {
  const max = Math.max(...data.map(d => d.price), 1);
  return (
    <View>
      {data.map((d, i) => (
        <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 4 }}>
          <Text style={{ width: 80 }}>{d.store}</Text>
          <View style={{ height: 10, width: 60 * (d.price / max), backgroundColor: '#007AFF' }} />
          <Text style={{ marginLeft: 4 }}>${d.price}</Text>
        </View>
      ))}
    </View>
  );
}
