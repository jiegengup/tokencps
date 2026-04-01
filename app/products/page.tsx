'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { formatMoney } from '@/lib/utils';

interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  commission: number;
  commissionRate: number;
  sales: number;
  category: string;
  tags: string[];
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('全部分类');
  const [sortBy, setSortBy] = useState('综合排序');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 获取商品数据
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
          setFilteredProducts(data);
        }
      } catch (error) {
        console.error('获取商品失败:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    // 筛选和排序逻辑
    let result = [...products];

    // 搜索筛选
    if (searchTerm.trim()) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 分类筛选
    if (category !== '全部分类') {
      result = result.filter((p) => p.category === category);
    }

    // 排序
    switch (sortBy) {
      case '佣金从高到低':
        result.sort((a, b) => b.commission - a.commission);
        break;
      case '销量从高到低':
        result.sort((a, b) => b.sales - a.sales);
        break;
      case '最新上架':
        result.reverse();
        break;
      default:
        // 综合排序保持原顺序
        break;
    }

    setFilteredProducts(result);
  }, [searchTerm, category, sortBy, products]);

  const handlePromote = (product: Product) => {
    const promotionLink = `https://tokencps.com/promo/${product.id}?ref=user123`;
    alert(`推广链接已生成：\n\n${promotionLink}\n\n复制链接分享给好友即可赚取佣金！`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">加载中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              TokenCPS联盟
            </Link>
            <nav className="flex items-center space-x-6">
              <Link href="/" className="text-gray-700 hover:text-orange-600">首页</Link>
              <Link href="/products" className="text-orange-600 font-medium">商品库</Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-orange-600">推广中心</Link>
              <Link href="/auth/login" className="btn-primary">登录</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 筛选栏 */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="搜索商品名称、关键词"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              />
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            >
              <option>全部分类</option>
              <option>数码电子</option>
              <option>服装鞋包</option>
              <option>美妆个护</option>
              <option>食品饮料</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            >
              <option>综合排序</option>
              <option>佣金从高到低</option>
              <option>销量从高到低</option>
              <option>最新上架</option>
            </select>
          </div>
        </div>

        {/* 商品列表 */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            没有找到相关商品
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="card overflow-hidden group cursor-pointer">
                <div className="relative aspect-square bg-gray-100">
                  <div className="absolute inset-0 flex items-center justify-center text-6xl">
                    📦
                  </div>
                  {product.tags.includes('热销') && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                      热销
                    </span>
                  )}
                  {product.tags.includes('高佣金') && (
                    <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                      高佣金
                    </span>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition">
                    {product.title}
                  </h3>
                  
                  <div className="flex items-baseline space-x-2 mb-2">
                    <span className="text-xl font-bold text-red-600">
                      {formatMoney(product.price)}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      {formatMoney(product.originalPrice)}
                    </span>
                  </div>

                  <div className="bg-orange-50 rounded p-2 mb-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">预估佣金</span>
                      <span className="text-orange-600 font-bold">
                        {formatMoney(product.commission)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                      <span>佣金比例 {product.commissionRate}%</span>
                      <span>已售 {product.sales}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handlePromote(product)}
                    className="w-full btn-primary py-2 text-sm"
                  >
                    立即推广
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 分页 */}
        <div className="mt-8 flex justify-center">
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              上一页
            </button>
            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg">
              1
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              2
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              3
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              下一页
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
