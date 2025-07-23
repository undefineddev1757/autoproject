import type { Database } from "sql.js";
import type { SqlJsStatic } from "sql.js";
import fs from "fs";
import path from "node:path";

export type TableName =
  | "contact_inquiries"
  | "calculator_inquiries"
  | "callback_inquiries";

const dbPath = path.join(process.cwd(), "database.sqlite");

// SQL.js database instance (initialized asynchronously)
let db: Database | null = null;

// DDL statements for all tables in the application
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

async function getDb(): Promise<Database> {
  if (db) return db;

  // Initialise sql.js (works for both ESM and CommonJS builds)
  const initModule = await import("sql.js");
  // Some bundlers export function as default, другие — сам объект; поддержим оба варианта
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const initSqlJs: any = (initModule as any).default || initModule;
  const SQL: SqlJsStatic = await initSqlJs({
      locateFile: (file: string) =>
        path.join(process.cwd(), "node_modules/sql.js/dist", file),
  });
  const filebuffer = fs.existsSync(dbPath) ? fs.readFileSync(dbPath) : undefined;
  db = filebuffer ? new SQL.Database(filebuffer) : new SQL.Database();
  const database = db as Database;

  // Create tables if they do not exist
  for (const sql of Object.values(tables)) {
    database.exec(sql);
  }

  console.log("SQLite (sql.js) initialised successfully");
  return database;
}

export function getTableForMessage(message?: string): TableName {
  if (message?.includes("Обратный звонок")) return "callback_inquiries";
  if (message?.includes("Остались вопросы")) return "calculator_inquiries";
  return "contact_inquiries";
}

export async function isDuplicate(
  email?: string,
  phone?: string,
): Promise<boolean> {
  if (!email && !phone) return false;
  const db = await getDb();
  const tbls: TableName[] = [
    "contact_inquiries",
    "calculator_inquiries",
    "callback_inquiries",
  ];
  for (const t of tbls) {
    const statement = db.prepare(
      `SELECT 1 FROM ${t} WHERE (phone = ? AND phone != '') OR (email = ? AND email != '') LIMIT 1`,
    );
    const result = statement.getAsObject([phone ?? "", email ?? ""]);
    if (result["1"]) return true;
  }
  return false;
}

export async function insertInquiry(
  table: TableName,
  data: { name?: string; email?: string; phone: string; message?: string },
): Promise<{ id: number; createdAt: Date }> {
  const db = await getDb();
  const stmt = db.prepare(
    `INSERT INTO ${table} (name, email, phone, message) VALUES (?, ?, ?, ?)`,
  );
  stmt.run([
    data.name ?? null,
    data.email ?? null,
    data.phone,
    data.message ?? null,
  ]);
  const idStmt = db.prepare("SELECT last_insert_rowid() as id;");
  const res = idStmt.getAsObject();
  return {
    id: Number(res.id),
    createdAt: new Date(),
  };
}

export default getDb;
