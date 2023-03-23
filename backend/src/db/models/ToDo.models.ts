import Sequelize from "sequelize";
import { sequelizeInstance } from "..";

export default class ToDo extends Sequelize.Model { }


ToDo.init(
    {
        id: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.DataTypes.UUIDV4,
        },
        title: {
            type: Sequelize.STRING,
            defaultValue: "Title",
        },
        description: {
            type: Sequelize.STRING,
            defaultValue: "",
        },
        isCompleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
    },

    { sequelize: sequelizeInstance, underscored: true, modelName: "todo" }
);