'use client'

import { useState, useEffect } from 'react'

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    commission: '',
    stock: '',
    status: 'active'
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setLoading(true)
    const res = await fetch('/api/admin/products')
    const data = await res.json()
    if (data.success) {
      setProducts(data.data.products)
    }
    setLoading(false)
  }

  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active'
    const res = await fetch('/api/admin/products', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: newStatus })
    })
    const data = await res.json()
    if (data.success) {
      fetchProducts()
    }
  }

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/admin/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    const data = await res.json()
    if (data.success) {
      alert('商品添加成功')
      setShowAddForm(false)
      setFormData({ title: '', price: '', commission: '', stock: '', status: 'active' })
      fetchProducts()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-900 text-white py-4 px-6">
        <h1 className="text-2xl font-bold">商品管理</h1>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">商品列表</h2>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {showAddForm ? '取消' : '添加商品'}
            </button>
          </div>

          {showAddForm && (
            <form onSubmit={handleAddProduct} className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="商品标题"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="px-4 py-2 border rounded"
                  required
                />
                <input
                  type="number"
                  placeholder="价格"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="px-4 py-2 border rounded"
                  required
                />
                <input
                  type="number"
                  placeholder="佣金"
                  value={formData.commission}
                  onChange={(e) => setFormData({ ...formData, commission: e.target.value })}
                  className="px-4 py-2 border rounded"
                  required
                />
                <input
                  type="number"
                  placeholder="库存"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="px-4 py-2 border rounded"
                  required
                />
              </div>
              <button
                type="submit"
                className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                确认添加
              </button>
            </form>
          )}

          {loading ? (
            <div className="text-center py-12">加载中...</div>
          ) : (
            <div className="overflow-x-auto">
              <div className="grid grid-cols-[60px_300px_100px_100px_100px_100px_100px_100px_140px] gap-4 min-w-max">
                <div className="font-semibold text-gray-700 py-3 border-b">ID</div>
                <div className="font-semibold text-gray-700 py-3 border-b">标题</div>
                <div className="font-semibold text-gray-700 py-3 border-b">价格</div>
                <div className="font-semibold text-gray-700 py-3 border-b">佣金</div>
                <div className="font-semibold text-gray-700 py-3 border-b">佣金比例</div>
                <div className="font-semibold text-gray-700 py-3 border-b">库存</div>
                <div className="font-semibold text-gray-700 py-3 border-b">销量</div>
                <div className="font-semibold text-gray-700 py-3 border-b">状态</div>
                <div className="font-semibold text-gray-700 py-3 border-b">操作</div>

                {products.map((product) => (
                  <>
                    <div key={`${product.id}-id`} className="py-3 border-b text-sm">{product.id}</div>
                    <div key={`${product.id}-title`} className="py-3 border-b text-sm">{product.title}</div>
                    <div key={`${product.id}-price`} className="py-3 border-b text-sm font-semibold">¥{product.price}</div>
                    <div key={`${product.id}-commission`} className="py-3 border-b text-sm text-green-600">¥{product.commission}</div>
                    <div key={`${product.id}-rate`} className="py-3 border-b text-sm">{product.commissionRate}%</div>
                    <div key={`${product.id}-stock`} className="py-3 border-b text-sm">{product.stock}</div>
                    <div key={`${product.id}-sales`} className="py-3 border-b text-sm">{product.sales}</div>
                    <div key={`${product.id}-status`} className="py-3 border-b text-sm">
                      <span className={`px-2 py-1 rounded text-xs ${
                        product.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {product.status === 'active' ? '上架' : '下架'}
                      </span>
                    </div>
                    <div key={`${product.id}-actions`} className="py-3 border-b text-sm">
                      <button
                        onClick={() => toggleStatus(product.id, product.status)}
                        className={`px-3 py-1 rounded text-xs ${
                          product.status === 'active'
                            ? 'bg-gray-500 text-white hover:bg-gray-600'
                            : 'bg-green-500 text-white hover:bg-green-600'
                        }`}
                      >
                        {product.status === 'active' ? '下架' : '上架'}
                      </button>
                    </div>
                  </>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
