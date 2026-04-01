'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/stores/cart-store';

interface Package {
  id: string;
  name: string;
  price: number;
  features: string[];
}

const packages: Package[] = [
  {
    id: 'basic',
    name: '基础版',
    price: 49,
    features: ['每月 10 万 tokens', '基础 API 调用', '邮件支持'],
  },
  {
    id: 'pro',
    name: '专业版',
    price: 149,
    features: ['每月 50 万 tokens', '高级 API 调用', '优先支持', '自定义模型'],
  },
  {
    id: 'enterprise',
    name: '企业版',
    price: 499,
    features: ['无限 tokens', '全部 API 功能', '7x24 专属支持', '私有部署'],
  },
];

export default function PurchasePage({ params }: { params: { productId: string } }) {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const [selectedPackage, setSelectedPackage] = useState<Package>(packages[0]);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 模拟获取商品详情
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${params.productId}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
        } else {
          // 使用模拟数据
          setProduct({
            id: params.productId,
            title: 'Claude API 服务',
            description: '强大的 AI 对话能力，支持多种应用场景',
            image: '/placeholder-product.jpg',
          });
        }
      } catch (error) {
        // 使用模拟数据
        setProduct({
          id: params.productId,
          title: 'Claude API 服务',
          description: '强大的 AI 对话能力，支持多种应用场景',
          image: '/placeholder-product.jpg',
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [params.productId]);

  const handleSubmit = () => {
    addItem({
      id: `${params.productId}-${selectedPackage.id}`,
      productId: params.productId,
      name: `${product?.title || 'Claude API'} - ${selectedPackage.name}`,
      price: selectedPackage.price,
      quantity,
      packageType: selectedPackage.id,
    });
    router.push('/purchase/checkout');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">加载中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* 商品详情 */}
          <div className="p-8 border-b">
            <div className="flex gap-8">
              <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">商品图片</span>
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {product?.title || 'Claude API 服务'}
                </h1>
                <p className="text-gray-600 mb-4">
                  {product?.description || '强大的 AI 对话能力，支持多种应用场景'}
                </p>
                <div className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  ¥{selectedPackage.price}/月
                </div>
              </div>
            </div>
          </div>

          {/* 套餐选择 */}
          <div className="p-8 border-b">
            <h2 className="text-xl font-bold text-gray-900 mb-4">选择套餐</h2>
            <div className="grid grid-cols-3 gap-4">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  onClick={() => setSelectedPackage(pkg)}
                  className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedPackage.id === pkg.id
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <div className="text-2xl font-bold text-orange-500 mb-4">
                    ¥{pkg.price}<span className="text-sm text-gray-500">/月</span>
                  </div>
                  <ul className="space-y-2">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-start">
                        <span className="text-orange-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* 数量选择 */}
          <div className="p-8 border-b">
            <h2 className="text-xl font-bold text-gray-900 mb-4">购买数量</h2>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 h-10 text-center border border-gray-300 rounded-lg"
                min="1"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>

          {/* 订单金额 */}
          <div className="p-8 bg-gray-50">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg text-gray-600">订单金额：</span>
              <span className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                ¥{(selectedPackage.price * quantity).toFixed(2)}
              </span>
            </div>
            <button
              onClick={handleSubmit}
              className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-bold text-lg hover:shadow-lg transition-shadow"
            >
              提交订单
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
