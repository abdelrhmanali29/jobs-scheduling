import {
	forwardRef,
	Inject,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './entities/job.entity';
import { JobScheduler } from './job.scheduler';

@Injectable()
export class JobService {
	constructor(
		@InjectRepository(Job) private jobRepository: Repository<Job>,
		@Inject(forwardRef(() => JobScheduler)) private jobScheduler: JobScheduler,
	) {}

	async createJob(
		name: string,
		interval: string,
		description: string,
		status: string,
	): Promise<Job> {
		const newJob = this.jobRepository.create({
			name,
			interval,
			description,
			lastRun: null,
			nextRun: new Date(),
			status,
		});
		const savedJob = await this.jobRepository.save(newJob);

		if (status === 'Active') {
			this.jobScheduler.scheduleJob(savedJob);
		}

		return savedJob;
	}

	async getJobs(): Promise<Job[]> {
		return await this.jobRepository.find();
	}

	async getJobById(id: number): Promise<Job> {
		const job = await this.jobRepository.findOneBy({ id });
		if (!job) {
			throw new NotFoundException(`Job with ID ${id} not found`);
		}
		return job;
	}

	async updateJobRun(job: Job) {
		job.lastRun = new Date();
		job.nextRun = this.calculateNextRun(job.interval);
		await this.jobRepository.save(job);
	}

	async cancelJob(id: number) {
		this.jobScheduler.cancelJob(id);
		const job = await this.jobRepository.findOneBy({ id });
		if (job) {
			job.status = 'Cancelled';
			await this.jobRepository.save(job);
		}
	}

	private calculateNextRun(interval: string): Date {
		const now = new Date();
		now.setMinutes(now.getMinutes() + 5);
		return now;
	}
}
