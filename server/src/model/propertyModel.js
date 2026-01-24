import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

export const Property = sequelize.define("Property", {

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  /* BASIC INFO */
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  propertyType: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  price: {
    type: DataTypes.DECIMAL(12, 2), // allows decimal
    allowNull: false,
  },

  area: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  /* LOCATION */
  locationArea: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  street: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  zip: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  /* IMAGES */
  images: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },

  /* AMENITIES */
  amenities: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },

  /* LEASE INFO */
  leaseType: {
    type: DataTypes.STRING,
    allowNull: true, // optional
  },

  tenantType: {
    type: DataTypes.STRING,
    allowNull: true, // optional
  },

  furnishingStatus: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  /* PROPERTY INFO */
  yearBuilt: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  level: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  bed: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  bath: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  kitchen: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  /* STATUS */
  status: {
    type: DataTypes.ENUM("active", "rented", "inactive"),
    defaultValue: "active",
  },

  /* METRICS */
  viewCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },

  saveCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },

});
