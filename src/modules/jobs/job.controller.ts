import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { Job } from './entities/job.entity';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('jobs')
@Controller({ path: 'jobs', version: '1' })
export class JobController {
	constructor(private readonly jobService: JobService) {}

	@Get()
	@ApiOperation({ summary: 'Get all jobs' })
	@ApiResponse({ status: 200, description: 'List of all jobs', type: [Job] })
	async getAllJobs(): Promise<Job[]> {
		return this.jobService.getJobs();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get job by ID' })
	@ApiParam({ name: 'id', type: Number, description: 'ID of the job' })
	@ApiResponse({ status: 200, description: 'Job details', type: Job })
	@ApiResponse({ status: 404, description: 'Job not found' })
	async getJob(@Param('id') id: number): Promise<Job> {
		return this.jobService.getJobById(id);
	}

	@Post()
	@ApiOperation({ summary: 'Create a new job' })
	@ApiResponse({
		status: 201,
		description: 'The job has been successfully created.',
		type: Job,
	})
	async createJob(@Body() createJobDto: CreateJobDto): Promise<Job> {
		return this.jobService.createJob(
			createJobDto.name,
			createJobDto.interval,
			createJobDto.description,
			createJobDto.status,
		);
	}
}
