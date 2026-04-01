import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  merchantId: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('simple-array')
  images: string[];

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  originalPrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  commission: number;

  @Column({ type: 'int' })
  commissionRate: number;

  @Column()
  category: string;

  @Column('simple-array')
  tags: string[];

  @Column({ type: 'int', default: 0 })
  stock: number;

  @Column({ type: 'int', default: 0 })
  sales: number;

  @Column({ type: 'enum', enum: ['active', 'inactive', 'soldout'], default: 'active' })
  status: 'active' | 'inactive' | 'soldout';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
