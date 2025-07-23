import Database from "better-sqlite3";
import path from "node:path";

export type TableName =
  | "contact_inquiries"
  | "calculator_inquiries"
  | "callback_inquiries";

const dbPath = path.join(process.cwd(), "database.sqlite");
const db = new Database(dbPath);

// Initialize tables
const tables: Record<TableName, string> = {
  contact_inquiries: `CREATE TABLE IF NOT EXISTS contact_inquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    phone TEXT,
    message TEXT,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP
  );`,
  calculator_inquiries: `CREATE TABLE IF NOT EXISTS calculator_inquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    phone TEXT,
    message TEXT,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP
  );`,
  callback_inquiries: `CREATE TABLE IF NOT EXISTS callback_inquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    phone TEXT,
    message TEXT,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP
  );`,
};

for (const sql of Object.values(tables)) {
  db.exec(sql);
}

export function getTableForMessage(message?: string): TableName {
  if (message?.includes("Обратный звонок")) return "callback_inquiries";
  if (message?.includes("Остались вопросы")) return "calculator_inquiries";
  return "contact_inquiries";
}

export function isDuplicate(email?: string, phone?: string): boolean {
  if (!email && !phone) return false;
  const tbls: TableName[] = [
    "contact_inquiries",
    "calculator_inquiries",
    "callback_inquiries",
  ];
  for (const t of tbls) {
    const row = db
      .prepare(
        `SELECT 1 FROM ${t} WHERE (phone = ? AND phone != '') OR (email = ? AND email != '') LIMIT 1`,
      )
      .get(phone ?? "", email ?? "");
    if (row) return true;
  }
  return false;
}

export function insertInquiry(
  table: TableName,
  data: { name?: string; email?: string; phone: string; message?: string },
) {
  const stmt = db.prepare(
    `INSERT INTO ${table} (name, email, phone, message) VALUES (?, ?, ?, ?)`,
  );
  const info = stmt.run(
    data.name ?? null,
    data.email ?? null,
    data.phone,
    data.message ?? null,
  );
  return { id: info.lastInsertRowid as number, createdAt: new Date() };
}

export default db;
