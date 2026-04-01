import { NextRequest, NextResponse } from 'next/server';
import { mockProducts } from '@/lib/db/config';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort');
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '20');

    // TODO: 从数据库查询，这里使用 Mock 数据
    let products = [...mockProducts];

    // 分类筛选
    if (category && category !== '全部分类') {
      products = products.filter(p => p.category === category);
    }

    // 搜索
    if (search) {
      products = products.filter(p => 
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    // 排序
    if (sort === '佣金从高到低') {
      products.sort((a, b) => b.commission - a.commission);
    } else if (sort === '销量从高到低') {
      products.sort((a, b) => b.sales - a.sales);
    } else if (sort === '最新上架') {
      products.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }

    // 分页
    const total = products.length;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedProducts = products.slice(start, end);

    return NextResponse.json({
      success: true,
      data: {
        products: paginatedProducts,
        pagination: {
          page,
          pageSize,
          total,
          totalPages: Math.ceil(total / pageSize),
        },
      },
    });
  } catch (error) {
    console.error('获取商品列表失败:', error);
    return NextResponse.json(
      { success: false, message: '获取商品列表失败' },
      { status: 500 }
    );
  }
}
