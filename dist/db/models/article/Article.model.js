"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Article = void 0;
const sequelize_1 = require("sequelize");
const config_db_1 = require("../../config.db");
class Article extends sequelize_1.Model {
}
exports.Article = Article;
Article.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    slug: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    image: {
        type: sequelize_1.DataTypes.TEXT
    },
    alt: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    claps: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0
    },
    category: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,
    sequelize: config_db_1.sequelizeConnection
});
//# sourceMappingURL=Article.model.js.map