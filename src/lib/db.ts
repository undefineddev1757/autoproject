import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import path from "node:path";

export type TableName =
  | "contact_inquiries"
  | "calculator_inquiries"
  | "callback_inquiries";

interface InquiryData {
  id: number;
  name?: string;
  email?: string;
  phone: string;
  message?: string;
  createdAt: string;
}

interface DatabaseSchema {
  contact_inquiries: InquiryData[];
  calculator_inquiries: InquiryData[];
  callback_inquiries: InquiryData[];
  _counter: number;
}

const dbPath = path.join(process.cwd(), "database.json");

// LowDB database instance
let db: Low<DatabaseSchema> | null = null;

const defaultData: DatabaseSchema = {
  contact_inquiries: [],
  calculator_inquiries: [],
  callback_inquiries: [],
  _counter: 0,
};

async function getDb(): Promise<Low<DatabaseSchema>> {
  if (db) return db;

  const adapter = new JSONFile<DatabaseSchema>(dbPath);
  db = new Low(adapter, defaultData);
  
  // Read data from JSON file, this will set db.data content
  await db.read();
  
  // If file doesn't exist or is empty, db.data will be null
  // In this case, use default data and write it to the file
  if (db.data === null) {
    db.data = defaultData;
    await db.write();
  }

  console.log("LowDB initialised successfully");
  return db;
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
  
  const database = await getDb();
  
  const tables: TableName[] = [
    "contact_inquiries",
    "calculator_inquiries", 
    "callback_inquiries",
  ];
  
  for (const tableName of tables) {
    const table = database.data[tableName];
    const found = table.find((inquiry: InquiryData) => 
      (phone && inquiry.phone === phone && inquiry.phone !== '') ||
      (email && inquiry.email === email && inquiry.email !== '')
    );
    if (found) return true;
  }
  
  return false;
}

export async function insertInquiry(
  table: TableName,
  data: { name?: string; email?: string; phone: string; message?: string },
): Promise<{ id: number; createdAt: Date }> {
  const database = await getDb();
  
  // Increment counter for unique ID
  database.data._counter++;
  const id = database.data._counter;
  const createdAt = new Date().toISOString();
  
  const inquiry: InquiryData = {
    id,
    name: data.name,
    email: data.email,
    phone: data.phone,
    message: data.message,
    createdAt,
  };
  
  database.data[table].push(inquiry);
  await database.write();
  
  return {
    id,
    createdAt: new Date(createdAt),
  };
}

export default getDb;
