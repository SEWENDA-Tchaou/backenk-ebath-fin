import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Btp = db.define('btpcontent', {
        name: DataTypes.STRING,
        image: DataTypes.STRING,
        url: DataTypes.STRING
    }, {
        freezeTableName: true
    });

export default Btp;

(async() => {
    await db.sync();
}) ();
