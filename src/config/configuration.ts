const DEFAULT_SERVER_PORT = 3000;

export interface Configuration {
	app: AppSetting;
	postgresDatabase: PostgresDatabase;
}

export interface AppSetting {
	env: string;
	port: number;
	logLevel: string;
	logFormat: string;
}

export interface PostgresDatabase {
	host: string;
	name?: string;
	database: string;
	username: string;
	password: string;
	ssl: boolean | PostgresDatabaseSSL;
}
export interface PostgresDatabaseSSL {
	rejectUnauthorized: boolean;
	ca: string;
	cert: string;
	key: string;
}

export const configuration = (): Configuration => {
	const defaultConfiguration: Configuration = {
		app: {
			env: process.env.NODE_ENV,
			port:
				parseInt(process.env.SERVER_PORT as string, 10) || DEFAULT_SERVER_PORT,
			logLevel: process.env.LOG_LEVEL,
			logFormat: process.env.LOG_FORMAT,
		},
		postgresDatabase: {
			host: process.env.POSTGRES_HOST as string,
			database: process.env.POSTGRES_DATABASE as string,
			username: process.env.POSTGRES_USERNAME as string,
			password: process.env.POSTGRES_PASSWORD as string,
			ssl:
				process.env.SSL && process.env.SSL == 'true'
					? {
							rejectUnauthorized:
								process.env.REJECT_UNAUTHORIZED &&
								process.env.REJECT_UNAUTHORIZED == 'true',
							ca: process.env.CA,
							cert: process.env.CERT,
							key: process.env.KEY,
						}
					: false,
		},
	};
	return defaultConfiguration;
};
