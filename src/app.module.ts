import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configuration } from '@config/configuration';
import { validate } from '@config/env.validation';
import { typeOrmModuleOptions } from '@config/orm.config';
import { JobModule } from '@App/modules/jobs/job.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [configuration],
			validate,
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: () => ({
				...typeOrmModuleOptions,
			}),
		}),

		JobModule,
	],
})
export class AppModule {}
