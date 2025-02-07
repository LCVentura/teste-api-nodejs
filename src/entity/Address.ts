import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';

@Entity({ name: 'addresses' })
export class Address {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255 })
  address!: string;

  @Column({ length: 10 })
  number!: string;

  @Column({ length: 255, nullable: true })
  complement?: string;

  @Column({ length: 10 })
  zip_code!: string;

  @Column({ length: 255 })
  city!: string;

  @Column({ length: 2 })
  state!: string;

  @ManyToOne(() => User, (user) => user.addresses, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' }) 
  user!: User;
}
