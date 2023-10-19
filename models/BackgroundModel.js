import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Background = db.define('backgroundcontent', {
        name: DataTypes.STRING,
        image: DataTypes.STRING,
        url: DataTypes.STRING
    }, {
        freezeTableName: true
    });

export default Background;

(async() => {
    await db.sync();
}) ();
