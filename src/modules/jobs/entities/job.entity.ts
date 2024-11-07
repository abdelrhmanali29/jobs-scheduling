import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Job {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column({ nullable: true })
	description: string;

	@Column({ nullable: true })
	lastRun: Date;

	@Column()
	nextRun: Date;

	@Column()
	interval: string;

	@Column()
	status: string;
}
