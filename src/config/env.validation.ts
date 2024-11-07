import { plainToInstance } from 'class-transformer';
import {
	IsBoolean,
	IsEnum,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	validateSync,
} from 'class-validator';

enum Environment {
	DEVELOPMENT = 'development',
	TEST = 'test',
	STAGING = 'staging',
	PRODUCTION = 'production',
}

class EnvironmentVariables {
	@IsEnum(Environment)
	NODE_ENV: Environment;

	@IsNumber()
	SERVER_PORT: number;

	@IsNotEmpty()
	@IsString()
	POSTGRES_HOST: string;

	@IsNotEmpty()
	@IsString()
	POSTGRES_DATABASE: string;

	@IsNotEmpty()
	@IsString()
	POSTGRES_USERNAME: string;

	@IsNotEmpty()
	@IsString()
	POSTGRES_PASSWORD: string;

	@IsBoolean()
	SSL: boolean;

	@IsOptional()
	@IsBoolean()
	REJECT_UNAUTHORIZED?: boolean;

	@IsOptional()
	@IsNotEmpty()
	@IsString()
	CA?: string;

	@IsOptional()
	@IsNotEmpty()
	@IsString()
	CERT?: string;

	@IsOptional()
	@IsNotEmpty()
	@IsString()
	KEY?: string;
}

export function validate(config: Record<string, unknown>) {
	const validatedConfig = plainToInstance(EnvironmentVariables, config, {
		enableImplicitConversion: true,
	});
	const errors = validateSync(validatedConfig, {
		skipMissingProperties: false,
	});

	if (errors.length > 0) {
		throw new Error(errors.toString());
	}
	return validatedConfig;
}
