import { Job } from '@App/modules/jobs/entities/job.entity';
import { JobController } from '@App/modules/jobs/job.controller';
import { JobScheduler } from '@App/modules/jobs/job.scheduler';
import { JobService } from '@App/modules/jobs/job.service';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [TypeOrmModule.forFeature([Job]), forwardRef(() => JobModule)],
	controllers: [JobController],
	providers: [JobService, JobScheduler],
	exports: [JobService, JobScheduler],
})
export class JobModule {}
