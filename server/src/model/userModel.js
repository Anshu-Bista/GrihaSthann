import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

export const User = sequelize.define("User", {
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },

    name: {
    type: DataTypes.STRING,
    allowNull: false
    },

    email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
    },

    phone: {
    type: DataTypes.STRING
    },

    address: {
    type: DataTypes.STRING
    },

    gender: {
    type: DataTypes.ENUM("male", "female", "other")
    },

    password: {
    type: DataTypes.STRING,
    allowNull: false
    },

    role: {
    type: DataTypes.STRING,
    defaultValue: "user"
    }
});


