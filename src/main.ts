import { NestFactory } from '@nestjs/core';
import { AppModule } from '@App/app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.enableVersioning({
		type: VersioningType.URI,
	});

	app.setGlobalPrefix('api');
	app.use(helmet());
	app.enableCors();
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
			forbidNonWhitelisted: true,
		}),
	);

	const config = new DocumentBuilder()
		.setTitle('Job Scheduling Microservice')
		.setDescription('API documentation for the job scheduling microservice')
		.setVersion('1.0')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api-docs', app, document);

	const configService = app.get(ConfigService);

	const port = configService.get('app.port');

	await app.listen(port);
}
bootstrap();
