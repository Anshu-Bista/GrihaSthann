import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

export const Request = sequelize.define("Request", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    propertyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "approved", "rejected"),
      defaultValue: "pending"
    },
    visitDate: {
      type: DataTypes.DATE,
      allowNull: true
    }
  });