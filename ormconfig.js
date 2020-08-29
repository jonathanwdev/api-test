module.exports = {
    "name":"default",
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "root",
    "password": "root",
    "database": "app",
    "entities":[
      "./src/modules/**/models/*{.ts,.js}"
    ],
    "migrations":[
      "./src/database/migrations/*.ts"
    ],
    "cli": {
      "migrationsDir": "./src/database/migrations"
    }
}


