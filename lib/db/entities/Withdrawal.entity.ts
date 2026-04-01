import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('withdrawals')
export class WithdrawalEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  fee: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  actualAmount: number;

  @Column({ type: 'enum', enum: ['alipay', 'wechat', 'bank'] })
  method: 'alipay' | 'wechat' | 'bank';

  @Column()
  account: string;

  @Column({ nullable: true })
  accountName?: string;

  @Column({ type: 'enum', enum: ['pending', 'processing', 'completed', 'rejected'], default: 'pending' })
  status: 'pending' | 'processing' | 'completed' | 'rejected';

  @Column({ nullable: true })
  reason?: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  processedAt?: Date;
}
