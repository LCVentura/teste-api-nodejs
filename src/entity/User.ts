// src/entity/User.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ nullable: true })
  phone!: string;

  @Column({ nullable: true })
  age!: number;

  // @Column({ nullable: true })
  // weight!: number;

  @Column({ nullable: true })
  ethnicity!: string;

  // @Column()
  // password!: string;
}
