import { Sequelize } from "sequelize";

const db = new Sequelize ('ebath_btp', 'root', '', {
    host:'localhost',
    dialect:'mysql'
});

export default db;
// module.exports = db;
