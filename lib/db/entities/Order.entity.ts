import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  orderNo: string;

  @Column()
  userId: string;

  @Column()
  promoterId: string;

  @Column()
  productId: string;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalAmount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  commission: number;

  @Column({ type: 'enum', enum: ['pending', 'paid', 'completed', 'cancelled', 'refunded'], default: 'pending' })
  status: 'pending' | 'paid' | 'completed' | 'cancelled' | 'refunded';

  @Column({ nullable: true })
  paidAt?: Date;

  @Column({ nullable: true })
  completedAt?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
