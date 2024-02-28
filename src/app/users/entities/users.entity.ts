import { IsEmail, IsString } from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('users')
export class UsersEntity extends BaseEntity {
@PrimaryGeneratedColumn()
id: number;

@IsString()
@Column({ name: 'name', nullable: false })
name: string;

@IsEmail()
@Column({ name: 'email' })
email: string;

@IsString()
@Column({ name: 'password' })
password: string;

@CreateDateColumn({ name: 'createdAt' })
createdAt: Date;

@UpdateDateColumn({ name: 'updatedAt' })
updatedAt: Date;
}
