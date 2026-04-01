import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('promotion_links')
export class PromotionLinkEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  productId: string;

  @Column({ unique: true })
  shortCode: string;

  @Column()
  fullUrl: string;

  @Column({ type: 'int', default: 0 })
  clicks: number;

  @Column({ type: 'int', default: 0 })
  orders: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  earnings: number;

  @CreateDateColumn()
  createdAt: Date;
}
