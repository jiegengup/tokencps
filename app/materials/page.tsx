'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function MaterialsPage() {
  const [category, setCategory] = useState('全部');
  const [search, setSearch] = useState('');
  const materials = [
    { id: '1', title: 'Claude API 推广海报 - 蓝色科技风', type: '海报', desc: '适合朋友圈和社群分享' },
    { id: '2', title: 'Claude API 推广海报 - 橙色活力风', type: '海报', desc: '适合短视频封面' },
    { id: '3', title: '高转化推广文案 - 开发者篇', type: '文案', desc: '面向开发者群体的推广文案模板' },
    { id: '4', title: '高转化推广文案 - 企业篇', type: '文案', desc: '面向企业客户的推广文案模板' },
    { id: '5', title: '首页Banner - 限时优惠', type: 'Banner', desc: '1200x400 网站横幅广告' },
    { id: '6', title: '侧边栏Banner - 新用户专享', type: 'Banner', desc: '300x600 侧边栏广告' },
    { id: '7', title: '短视频脚本 - 30秒版', type: '视频脚本', desc: '适合抖音/快手短视频' },
    { id: '8', title: '短视频脚本 - 60秒版', type: '视频脚本', desc: '适合B站/小红书视频' },
  ];
  const categories = ['全部', '海报', '文案', 'Banner', '视频脚本'];
  const filtered = materials.filter(m => (category === '全部' || m.type === category) && (!search || m.title.includes(search)));
  const typeColors: Record<string, string> = { '海报': 'bg-purple-100 text-purple-700', '文案': 'bg-blue-100 text-blue-700', 'Banner': 'bg-green-100 text-green-700', '视频脚本': 'bg-red-100 text-red-700' };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm"><div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">TokenCPS联盟</Link>
        <nav className="flex space-x-6"><Link href="/dashboard" className="text-gray-700 hover:text-orange-600">推广中心</Link><Link href="/materials" className="text-orange-600 font-medium">素材库</Link></nav>
      </div></header>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">推广素材库</h1>
        <div className="card p-4 mb-6"><div className="flex items-center space-x-4">
          <input type="text" placeholder="搜索素材..." value={search} onChange={e => setSearch(e.target.value)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
          <div className="flex space-x-2">{categories.map(c => (
            <button key={c} onClick={() => setCategory(c)} className={`px-4 py-2 rounded-lg text-sm ${category === c ? 'bg-orange-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>{c}</button>
          ))}</div>
        </div></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map(m => (
            <div key={m.id} className="card overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-4xl">🎨</div>
              <div className="p-4">
                <div className="flex items-center space-x-2 mb-2"><span className={`text-xs px-2 py-0.5 rounded ${typeColors[m.type] || ''}`}>{m.type}</span></div>
                <h3 className="font-medium text-sm mb-1">{m.title}</h3>
                <p className="text-xs text-gray-500 mb-3">{m.desc}</p>
                <div className="flex space-x-2"><button className="flex-1 text-sm py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">下载</button><button className="flex-1 text-sm py-2 border border-gray-300 rounded-lg hover:bg-gray-50">复制链接</button></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
