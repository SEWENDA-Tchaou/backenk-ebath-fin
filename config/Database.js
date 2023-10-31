import { Sequelize } from "sequelize";

const db = new Sequelize ('prudent_ebath_btp', 'prudent', 'prudent@prudent', {
    host:'mysql-prudent.alwaysdata.net',
    dialect:'mysql'
});

export default db;
// module.exports = db;
