import { Sequelize } from "sequelize-typescript";
import ToDo from "./models/todo.model";


const sequelizeInstance: Sequelize = new Sequelize(process.env.DATABASE_NAME!, process.env.DATABASE_USERNAME!, process.env.DATABASE_PASSWORD!, {
  dialect: "postgres",
  host: process.env.DATABASE_HOST!,
  port: Number(process.env.DATABASE_PORT!),
  models: [ ToDo ],
  // logging: false,
});


export default async function initDB(): Promise<void> {
    try {
        await sequelizeInstance.authenticate();
        await sequelizeInstance.sync();
        console.log("Sequelize was initialized");
    } catch (error) {
        console.log("Sequelize ERROR (initDB)", error);
        process.exit();
    }
};