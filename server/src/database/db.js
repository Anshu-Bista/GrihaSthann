import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  "GrihaSthan",    
  "postgres",     
  "postgresql",    
  {
    host: "localhost",
    dialect: "postgres",
    
  }
);

