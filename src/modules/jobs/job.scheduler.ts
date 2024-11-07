import { Job } from '@App/modules/jobs/entities/job.entity';
import { JobService } from '@App/modules/jobs/job.service';
import { forwardRef, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import * as schedule from 'node-schedule';

@Injectable()
export class JobScheduler implements OnModuleInit {
	private scheduledJobs: Map<number, schedule.Job> = new Map();

	constructor(
		@Inject(forwardRef(() => JobService)) private jobService: JobService,
	) {}

	async onModuleInit() {
		await this.initializeJobs();
	}

	private async initializeJobs() {
		const jobs = await this.jobService.getJobs();
		jobs.forEach((job) => {
			if (job.status === 'Active') {
				this.scheduleJob(job);
			}
		});
	}

	// Method to schedule a job
	scheduleJob(job: Job) {
		const scheduledJob = schedule.scheduleJob(job.interval, async () => {
			console.log(`Executing job: ${job.name}`);
			await this.jobService.updateJobRun(job); // Update job lastRun and nextRun in the database
		});

		this.scheduledJobs.set(job.id, scheduledJob);
		console.log(`Scheduled job ${job.name} with interval ${job.interval}`);
	}

	// Run a job immediately
	async runJobNow(job: Job) {
		console.log(`Running job ${job.name} immediately`);
		await this.jobService.updateJobRun(job); // Perform job and update lastRun/nextRun
	}

	// Cancel a scheduled job
	cancelJob(jobId: number) {
		const scheduledJob = this.scheduledJobs.get(jobId);
		if (scheduledJob) {
			scheduledJob.cancel();
			this.scheduledJobs.delete(jobId);
			console.log(`Cancelled job with ID: ${jobId}`);
		}
	}
}
