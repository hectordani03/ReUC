import { PrismaClient } from "../generated/prisma/client.js";
import { tableNames } from "../db/client.js";

const prisma = new PrismaClient();

const main = async () => {
  // Step 1: tableNames keys and values
  const dbTableKeys = Object.keys(tableNames);
  const dbTableValues = Object.values(tableNames);

  // Step 2: Prisma model names
  const modelNames = Object.keys(prisma).filter(
    (key) => typeof prisma[key]?.findMany === "function"
  );

  // Step 3: Query database table names (PostgreSQL-style query)
  const tables = await prisma.$queryRawUnsafe(`
    SELECT name as table_name
    FROM sqlite_master
    WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE '_prisma_%';
  `);
  const realTableNames = tables.map((table) => table.table_name);

  // --- VALIDATION ---

  // 1. All Prisma models must be keys in tableNames
  const missingKeys = modelNames.filter(
    (model) => !dbTableKeys.includes(model)
  );

  // 2. All tableNames values must exist in the actual DB
  const invalidValues = dbTableValues.filter(
    (value) => !realTableNames.includes(value)
  );

  // 3. Report issues
  if (missingKeys.length || invalidValues.length) {
    if (missingKeys.length) {
      console.error(
        `Missing tableNames keys for models: ${missingKeys.join(", ")}`
      );
    }
    if (invalidValues.length) {
      console.error(
        `Invalid tableNames values (tables not found): ${invalidValues.join(
          ", "
        )}`
      );
    }
    process.exit(1);
  } else {
    console.log(
      "tableNames keys and values are correctly synced with Prisma and DB tables."
    );
  }

  await prisma.$disconnect();
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
