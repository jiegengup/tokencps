import { DataSource } from 'typeorm';
import { UserEntity } from './entities/User.entity';
import { ProductEntity } from './entities/Product.entity';
import { PromotionLinkEntity } from './entities/PromotionLink.entity';
import { OrderEntity } from './entities/Order.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'tokencps',
  synchronize: process.env.NODE_ENV === 'development', // 开发环境自动同步
  logging: process.env.NODE_ENV === 'development',
  entities: [UserEntity, ProductEntity, PromotionLinkEntity, OrderEntity],
  migrations: ['lib/db/migrations/*.ts'],
  subscribers: [],
});

// 初始化数据库连接
let isInitialized = false;

export async function initializeDatabase() {
  if (!isInitialized) {
    try {
      await AppDataSource.initialize();
      isInitialized = true;
      console.log('✅ 数据库连接成功');
    } catch (error) {
      console.error('❌ 数据库连接失败:', error);
      throw error;
    }
  }
  return AppDataSource;
}

export async function getRepository<T>(entity: any) {
  if (!isInitialized) {
    await initializeDatabase();
  }
  return AppDataSource.getRepository<T>(entity);
}
