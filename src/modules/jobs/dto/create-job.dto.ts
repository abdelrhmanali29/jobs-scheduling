import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateJobDto {
	@ApiProperty({ description: 'The name of the job' })
	@IsString()
	@IsNotEmpty()
	name: string;

	@ApiProperty({ description: 'Description of the job', required: false })
	@IsString()
	@IsOptional()
	description?: string;

	@ApiProperty({ description: 'Interval for job execution in cron syntax' })
	@IsString()
	@IsNotEmpty()
	interval: string; // Specify intervals using cron syntax or a description, e.g., "5 minutes"

	@ApiProperty({
		description: 'Status of the job',
		enum: ['Active', 'Paused', 'Completed'],
	})
	@IsIn(['Active', 'Paused', 'Completed'])
	status: string; // Setting default status on creation to 'Active'
}
