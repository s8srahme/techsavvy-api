"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbInit = void 0;
const config_db_1 = require("./config.db");
const isDev = process.env.NODE_ENV === "development";
const dbInit = async () => {
    try {
        await config_db_1.sequelizeConnection.authenticate();
        console.log("[server] database connection has been established successfully");
        await config_db_1.sequelizeConnection.sync({ alter: isDev });
        console.log("[server] all models were synchronized successfully");
    }
    catch (err) {
        console.error("[server] unable to connect to the database", err);
    }
};
exports.dbInit = dbInit;
//# sourceMappingURL=init.db.js.map