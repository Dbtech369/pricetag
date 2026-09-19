import SQLite from 'react-native-sqlite-storage';

const DB = SQLite.openDatabase({ name: 'pricetag.db', location: 'default' });

export const initDB = () => new Promise((res, rej) => {
  DB.transaction(tx => {
    tx.executeSql(`CREATE TABLE IF NOT EXISTS price_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      barcode TEXT,
      product_name TEXT,
      price REAL,
      store TEXT,
      date TEXT,
      latitude REAL,
      longitude REAL
    );`);
    tx.executeSql(`CREATE TABLE IF NOT EXISTS nearby_prices (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      barcode TEXT,
      price REAL,
      store TEXT,
      lat REAL,
      lng REAL,
      reported_at TEXT
    );`);
  }, rej, res);
});

export const logPrice = (row) => new Promise((res, rej) => {
  DB.transaction(tx => {
    tx.executeSql('INSERT INTO price_logs (barcode, product_name, price, store, date, latitude, longitude) VALUES (?,?,?,?,?,?,?)',
      [row.barcode, row.product_name, row.price, row.store, row.date, row.lat, row.lng], (_, r) => res(r.insertId), rej);
  });
});

export const historyFor = (barcode) => new Promise((res, rej) => {
  DB.transaction(tx => {
    tx.executeSql('SELECT * FROM price_logs WHERE barcode = ? ORDER BY date DESC', [barcode], (_, r) => res(r.rows.raw()));
  });
});

export const nearbyFor = (barcode, lat, lng, radiusKm = 5) => new Promise((res, rej) => {
  DB.transaction(tx => {
    tx.executeSql('SELECT * FROM nearby_prices WHERE barcode = ?', [barcode], (_, r) => res(r.rows.raw()));
  });
});
