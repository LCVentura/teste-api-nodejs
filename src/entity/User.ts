import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Address } from './Address';

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

  @Column({ nullable: true })
  ethnicity!: string;

  @Column({ nullable: true })
  password!: string;

  @OneToMany(() => Address, (address) => address.user)
  addresses!: Address[];
}
