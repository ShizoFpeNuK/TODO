import { Sequelize } from "sequelize";


export const sequelizeInstance = new Sequelize( "ToDo", "root", "root", {
    dialect: "postgres",
    host: "localhost",
    port: 5432,
    //logging: false
});


export default async function initDB(): Promise<void> {
    try {
        await sequelizeInstance.authenticate(); //Авторизация нашей ORM в БД
        await sequelizeInstance.sync(); //Синхронизация МОДЕЛЕЙ
        console.log("Sequelize was initialized");
    } catch (error) {
        console.log("Sequelize ERROR (initDB)", error);
        process.exit();
    }
};