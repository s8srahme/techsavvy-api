import { sequelizeConnection } from "./config.db";

const isDev = process.env.NODE_ENV === "development";

export const dbInit = async () => {
	try {
		// Testing database connection
		await sequelizeConnection.authenticate();
		console.log("[server] database connection has been established successfully");

		// alter option creates the table if it does not exist or updates the table to match the attributes defined in
		// the model
		await sequelizeConnection.sync({ alter: isDev });
		console.log("[server] all models were synchronized successfully");
	} catch (err) {
		console.error("[server] unable to connect to the database", err);
	}
};
