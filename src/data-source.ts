const { DataSource } = require("typeorm")

const AppDataSource = new DataSource({
  type: "postgres",
  port: 5432,
  username: 'postgres',
  password: 'letmein1',
  database: 'nuacem',
  entities: [
    "dist/user/user.entity.js",
  ],
  migrations: [
    "dist/migrations/typeorm-migrations/1728964531-create-user.js",
  ],
})

module.exports = {
  datasource: AppDataSource,
}