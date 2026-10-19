import { createClient, type Client } from "@libsql/client";
import { mkdir } from "node:fs/promises";
import path from "node:path";

let clientPromise: Promise<Client> | null = null;
let schemaReady = false;

function createDbClient(): Client {
  const tursoUrl = process.env.TURSO_DATABASE_URL?.trim();
  const tursoToken = process.env.TURSO_AUTH_TOKEN?.trim();

  if (tursoUrl && tursoToken) {
    return createClient({
      url: tursoUrl,
      authToken: tursoToken,
    });
  }

  // Относительный file: — как в README. Абсолютный путь через cwd
  // попадал в watcher Turbopack и провоцировал перезагрузки в dev.
  return createClient({
    url: "file:data/leads.db",
  });
}

async function ensureLocalDataDir(): Promise<void> {
  const tursoUrl = process.env.TURSO_DATABASE_URL?.trim();
  const tursoToken = process.env.TURSO_AUTH_TOKEN?.trim();
  if (tursoUrl && tursoToken) {
    return;
  }
  await mkdir(path.join(process.cwd(), "data"), { recursive: true });
}

async function ensureSchema(client: Client): Promise<void> {
  if (schemaReady) {
    return;
  }

  await client.execute(`
    CREATE TABLE IF NOT EXISTS leads (
      id TEXT PRIMARY KEY,
      created_at TEXT NOT NULL,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      interest TEXT NOT NULL,
      comment TEXT NOT NULL,
      attribution TEXT NOT NULL
    )
  `);
  await client.execute(`
    CREATE INDEX IF NOT EXISTS leads_phone_created_at
    ON leads (phone, created_at)
  `);
  schemaReady = true;
}

export async function getDb(): Promise<Client> {
  if (!clientPromise) {
    clientPromise = (async () => {
      await ensureLocalDataDir();
      return createDbClient();
    })();
  }

  const client = await clientPromise;
  await ensureSchema(client);
  return client;
}
