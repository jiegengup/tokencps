import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  phone: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  nickname?: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ type: 'enum', enum: ['user', 'merchant', 'admin'], default: 'user' })
  role: 'user' | 'merchant' | 'admin';

  @Column({ type: 'enum', enum: ['active', 'inactive', 'banned'], default: 'active' })
  status: 'active' | 'inactive' | 'banned';

  @Column({ unique: true })
  inviteCode: string;

  @Column({ nullable: true })
  invitedBy?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  balance: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  totalEarnings: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
