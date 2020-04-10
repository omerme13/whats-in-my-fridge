import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('whatsInFridge.db');

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `
                CREATE TABLE IF NOT EXISTS fridge (
                    id INTEGER PRIMARY KEY NOT NULL,
                    name TEXT NOT NULL,
                    label TEXT,
                    expiryDate DATE,
                    quantity REAL NOT NULL,
                    unit TEXT,
                    toBuy BOOLEAN,
                    photo TEXT
                );
                CREATE TABLE IF NOT EXISTS shoppingList (
                    id INTEGER NOT NULL,
                    name TEXT NOT NULL,
                    label TEXT;
                );`
                // 'DROP TABLE fridge'
                ,
                [],
                () => resolve(),
                (_, err) => reject(err)
            );
        });
    });

    return promise;
};

export const insertProduct = (
    name,
    label,
    expiryDate,
    quantity,
    unit,
    toBuy,
    photo
) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(`
                INSERT INTO fridge (name, label, expiryDate, quantity, unit, toBuy, photo)
                    VALUES (?,?,?,?,?,?,?)
                `,
                [name, label, expiryDate, quantity, unit, toBuy, photo],
                (_, result) => resolve(result),
                (_, err) => reject(err)
            );
        });
    });

    return promise;
};

export const editProduct = (
    id,
    name,
    label,
    expiryDate,
    quantity,
    unit,
    toBuy,
    photo
) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(`
                UPDATE fridge SET name=?, label=?, expiryDate=?, quantity=?, unit=?, toBuy=?, photo=?
                WHERE id = ${id}
                `,
                [name, label, expiryDate, quantity, unit, toBuy, photo],
                (_, result) => resolve(result),
                (_, err) => reject(err)
            );
        });
    });

    return promise;
};

export const fetchProducts = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM fridge',
                [],
                (_, result) => resolve(result),
                (_, err) => reject(err)
            );
        });
    });

    return promise;
};