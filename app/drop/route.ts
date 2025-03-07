import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function dropTables() {
  return await sql`
    DROP TABLE IF EXISTS users, invoices, customers, revenue;
  `;
}

export async function GET() {
  try {
    const result = await sql.begin((sql) => [dropTables()]);
    return Response.json({ message: "Tables drop successfully" });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
