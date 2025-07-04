import { PrismaClient } from "./generated/prisma/client.js";
import { adminRepo } from "./adminRepo.js";
import { tableNames, tableSchemas } from "./db/client.js";
const prisma = new PrismaClient();

async function main() {
  // const tables = await prisma.$queryRaw`
  //   SELECT table_name
  //   FROM information_schema.tables
  //   WHERE table_schema = 'public'
  //   AND table_type = 'BASE TABLE'
  //   AND table_name NOT LIKE '_prisma%';
  // `;
  // let tNames = tables.map((table) => table.table_name);
  // console.log(tNames);

  // const tablesData = {};
  // const datatypes = new Set();
  // for (const tableName of tNames) {
  //   const columns = await prisma.$queryRaw`
  //     SELECT column_name, data_type
  //     FROM information_schema.columns
  //     WHERE table_name = ${tableName};
  //   `;
  //   tablesData[tableName] = [];

  //   for (const column of columns) {
  //     const name = column.column_name;
  //     const datatype = column.data_type.split(" ").shift();

  //     tablesData[tableName].push({ name, datatype });
  //     datatypes.add(datatype);
  //   }
  // }
  // console.log([...datatypes]);
  // console.log(tablesData);

  let validModels = Object.keys(prisma).filter(
    (key) => typeof prisma[key]?.findMany === "function"
  );
  // console.log(validModels);

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  async function fun() {
    console.time("Time");
    const index = 4;
    const admin_models = Object.keys(tableNames);
    const admin_tables = Object.values(tableNames);
    const admin_schemas = adminRepo.getTableSchema(admin_tables[index]);
    console.log("-1", index);
    console.log("0", Object.values(tableNames));
    console.log("1", admin_models);
    console.log("2", admin_schemas);
    console.log("3", admin_models[index]);
    console.log("4", admin_tables[index]);
    console.log("5", Object.keys(admin_schemas));
    // console.log(
    //   "6",
    //   await adminRepo.fetchLimitRecords({ tableName: admin_tables[index] })
    // );
    console.log(
      "6",
      await adminRepo.fetchTableStats({
        tableName: admin_tables[index],
        query: { name: "Director de plantel" },
      })
    );
    console.timeEnd("Time");
  }

  fun();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
