import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from './User.entity';
import { Order } from './Order.entity';

export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
  WITHDRAWAL = 'withdrawal',
  REFUND = 'refund',
}

@Entity('transactions')
@Index(['userId', 'createdAt'])
@Index(['type', 'createdAt'])
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  userId!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @Column({
    type: 'enum',
    enum: TransactionType,
  })
  type!: TransactionType;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  balance!: number;

  @Column({ type: 'uuid', nullable: true })
  relatedOrderId?: string;

  @ManyToOne(() => Order, { nullable: true })
  @JoinColumn({ name: 'relatedOrderId' })
  relatedOrder?: Order;

  @Column({ type: 'text' })
  description!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
