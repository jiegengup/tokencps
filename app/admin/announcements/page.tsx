'use client'

import React, { useState } from 'react'

type Audience = '全部' | '推广员' | 'C端用户'
type Status = '已发布' | '草稿' | '已下线'
type Tab = '全部' | '已发布' | '草稿' | '已下线'

interface Announcement {
  id: string
  title: string
  content: string
  audience: Audience
  pinned: boolean
  status: Status
  publishedAt: string
}

const MOCK_ANNOUNCEMENTS: Announcement[] = [
  { id: 'A10001', title: '平台佣金规则升级通知', content: '自2026年4月起，平台佣金规则将进行全面升级，详情请查看佣金说明页面。', audience: '推广员', pinned: true, status: '已发布', publishedAt: '2026-03-28 10:00' },
  { id: 'A10002', title: '五一促销活动即将开启', content: '五一期间全场套餐享受8折优惠，推广员佣金比例同步提升。', audience: '全部', pinned: false, status: '已发布', publishedAt: '2026-03-25 14:30' },
  { id: 'A10003', title: '新用户注册赠送优惠券', content: '新注册用户将自动获得一张满100减20优惠券。', audience: 'C端用户', pinned: false, status: '草稿', publishedAt: '-' },
  { id: 'A10004', title: '系统维护公告（3月20日）', content: '系统将于3月20日凌晨2:00-6:00进行维护升级，届时服务将暂停。', audience: '全部', pinned: false, status: '已下线', publishedAt: '2026-03-18 09:00' },
  { id: 'A10005', title: '推广员等级制度说明', content: '推广员等级分为初级、中级、高级三档，不同等级享受不同佣金比例。', audience: '推广员', pinned: false, status: '已发布', publishedAt: '2026-03-10 16:00' },
]

const TABS: Tab[] = ['全部', '已发布', '草稿', '已下线']
const AUDIENCES: Audience[] = ['全部', '推广员', 'C端用户']

const audienceStyle: Record<Audience, string> = {
  '全部': 'bg-info-light text-info',
  '推广员': 'bg-accent-light text-accent',
  'C端用户': 'bg-success-light text-success',
}

const statusStyle: Record<Status, string> = {
  '已发布': 'bg-success-light text-success',
  '草稿': 'bg-warning-light text-warning',
  '已下线': 'bg-danger-light text-danger',
}

interface ModalForm {
  title: string
  content: string
  audience: Audience
  pinned: boolean
}

const emptyForm: ModalForm = { title: '', content: '', audience: '全部', pinned: false }

export default function AnnouncementsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('全部')
  const [announcements, setAnnouncements] = useState(MOCK_ANNOUNCEMENTS)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<ModalForm>(emptyForm)

  const filtered = announcements.filter((a) => {
    if (activeTab === '全部') return true
    return a.status === activeTab
  })

  function openCreate() {
    setEditingId(null)
    setForm(emptyForm)
    setModalOpen(true)
  }

  function openEdit(a: Announcement) {
    setEditingId(a.id)
    setForm({ title: a.title, content: a.content, audience: a.audience, pinned: a.pinned })
    setModalOpen(true)
  }

  function handleSave() {
    if (!form.title.trim()) return
    if (editingId) {
      setAnnouncements((prev) =>
        prev.map((a) => a.id === editingId ? { ...a, ...form } : a)
      )
    } else {
      const newId = `A${10000 + announcements.length + 1}`
      setAnnouncements((prev) => [
        { id: newId, ...form, status: '草稿' as Status, publishedAt: '-' },
        ...prev,
      ])
    }
    setModalOpen(false)
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-text">公告管理</h1>
        <button
          onClick={openCreate}
          className="px-4 py-2 text-sm font-medium text-white bg-accent rounded-[--radius-sm] hover:opacity-90 transition-opacity"
        >
          发布公告
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="bg-card border border-border-light rounded-[--radius-md] p-4">
        <div className="flex gap-1">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 text-xs rounded-[--radius-sm] font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-accent text-white'
                  : 'text-text-secondary hover:bg-hover'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border-light rounded-[--radius-md] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-light bg-bg-secondary/50">
                <th className="text-left px-4 py-3 font-medium text-text-secondary">标题</th>
                <th className="text-center px-4 py-3 font-medium text-text-secondary">目标受众</th>
                <th className="text-center px-4 py-3 font-medium text-text-secondary">状态</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">发布时间</th>
                <th className="text-center px-4 py-3 font-medium text-text-secondary">操作</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-text-tertiary">暂无公告</td>
                </tr>
              ) : (
                filtered.map((a) => (
                  <tr key={a.id} className="border-b border-border-light last:border-b-0 hover:bg-hover transition-colors">
                    <td className="px-4 py-3 text-text font-medium">
                      {a.pinned && <span className="text-xs text-accent mr-1">[置顶]</span>}
                      {a.title}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-block px-2 py-0.5 text-xs rounded-full ${audienceStyle[a.audience]}`}>
                        {a.audience}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-block px-2 py-0.5 text-xs rounded-full ${statusStyle[a.status]}`}>
                        {a.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-text-secondary">{a.publishedAt}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button onClick={() => openEdit(a)} className="px-2 py-1 text-xs text-accent hover:bg-accent-light rounded-[--radius-sm] transition-colors">编辑</button>
                        {a.status === '已发布' && (
                          <button className="px-2 py-1 text-xs text-danger hover:bg-danger-light rounded-[--radius-sm] transition-colors">下线</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer summary */}
      <div className="text-xs text-text-tertiary">
        共 {filtered.length} 条记录
      </div>

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40" onClick={() => setModalOpen(false)} />
          {/* Panel */}
          <div className="relative w-full max-w-lg mx-4 bg-card border border-border-light rounded-[--radius-md] shadow-xl">
            <div className="flex items-center justify-between px-6 pt-5 pb-0">
              <h2 className="text-base font-semibold text-text">
                {editingId ? '编辑公告' : '发布公告'}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-text-tertiary hover:text-text transition-colors text-lg leading-none"
              >
                &times;
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">
              {/* 标题 */}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">标题</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="请输入公告标题"
                  className="w-full px-3 py-2 text-sm text-text bg-bg border border-border rounded-[--radius-sm] outline-none focus:border-accent transition-colors"
                />
              </div>

              {/* 内容 */}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">内容</label>
                <textarea
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  placeholder="请输入公告内容"
                  rows={4}
                  className="w-full px-3 py-2 text-sm text-text bg-bg border border-border rounded-[--radius-sm] outline-none focus:border-accent transition-colors resize-none"
                />
              </div>

              {/* 目标受众 */}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">目标受众</label>
                <select
                  value={form.audience}
                  onChange={(e) => setForm({ ...form, audience: e.target.value as Audience })}
                  className="w-full px-3 py-2 text-sm text-text bg-bg border border-border rounded-[--radius-sm] outline-none focus:border-accent transition-colors"
                >
                  {AUDIENCES.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>

              {/* 是否置顶 */}
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-text-secondary">是否置顶</label>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, pinned: !form.pinned })}
                  className={`relative w-10 h-5 rounded-full transition-colors ${
                    form.pinned ? 'bg-accent' : 'bg-border'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                      form.pinned ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Footer buttons */}
            <div className="flex items-center justify-end gap-2 px-6 pb-5">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-text-secondary bg-bg-secondary rounded-[--radius-sm] hover:bg-hover transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm font-medium text-white bg-accent rounded-[--radius-sm] hover:opacity-90 transition-opacity"
              >
                {editingId ? '保存' : '发布'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}