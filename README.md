# Vuelta al menu en 365 platos (Backend)

## Importante
Recuerda crear el archivo de enterno (.env), lo puedes copiar con el siguiente comando:
`copy .env.example .env`

## Comandos
Recuerda ejecutar `npm install` antes de utilizar cualquier otro comando.

Aquí se encuentran los comandos que se utilizarán en el backend:

- `npm i mysql2 `: Instala las dependencias de mysql.

# Commands Migrations
## Create Migration:

`sequelize migration:generate --name [name_migration]`

## Revert last Migration:

`sequelize db:migrate:undo`

## evert All Migrations:

`sequelize db:migrate:undo:all`

## Execute Migrations:

sequelize db:migrate

# Commands Seeders
## Create Seeder:

`sequelize seed:generate --name [name_seeder]`

## Revert last Seeder:

`sequelize db:seeder:undo`

## Revert All Seeders:

`sequelize db:seeder:undo:all`

## Execute Seeders:

`sequelize db:seed:all`
