import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Hotel = db.define('hotelcontent', {
        name: DataTypes.STRING,
        image: DataTypes.STRING,
        url: DataTypes.STRING
    }, {
        freezeTableName: true
    });

export default Hotel;

(async() => {
    await db.sync();
}) ();
