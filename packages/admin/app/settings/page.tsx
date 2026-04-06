'use client'

import React, { useState } from 'react'

interface SettingField {
  label: string
  key: string
  type: 'text' | 'number'
  defaultValue: string | number
  suffix?: string
}

interface SettingSection {
  title: string
  fields: SettingField[]
}

const SECTIONS: SettingSection[] = [
  {
    title: '基础配置',
    fields: [
      { label: '平台名称', key: 'platformName', type: 'text', defaultValue: 'TokenCPS' },
      { label: '客服联系方式', key: 'supportContact', type: 'text', defaultValue: 'support@tokencps.com' },
      { label: '公告开关', key: 'announcementEnabled', type: 'text', defaultValue: '开启' },
    ],
  },
  {
    title: '佣金配置',
    fields: [
      { label: '默认佣金比例', key: 'defaultCommission', type: 'number', defaultValue: 15, suffix: '%' },
      { label: '二级佣金比例', key: 'secondCommission', type: 'number', defaultValue: 5, suffix: '%' },
      { label: '结算周期', key: 'settlementCycle', type: 'number', defaultValue: 7, suffix: 'T+N 天' },
    ],
  },
  {
    title: '提现配置',
    fields: [
      { label: '最低提现金额', key: 'minWithdraw', type: 'number', defaultValue: 100, suffix: '元' },
      { label: '单日提现上限', key: 'dailyWithdrawLimit', type: 'number', defaultValue: 50000, suffix: '元' },
      { label: '提现手续费率', key: 'withdrawFeeRate', type: 'number', defaultValue: 0.5, suffix: '%' },
    ],
  },
  {
    title: '安全配置',
    fields: [
      { label: '登录失败锁定次数', key: 'loginLockCount', type: 'number', defaultValue: 5, suffix: '次' },
      { label: '密码最小长度', key: 'minPasswordLength', type: 'number', defaultValue: 8, suffix: '位' },
      { label: '会话超时时间', key: 'sessionTimeout', type: 'number', defaultValue: 30, suffix: '分钟' },
    ],
  },
]

export default function SettingsPage() {
  const [values, setValues] = useState<Record<string, string | number>>(() => {
    const init: Record<string, string | number> = {}
    SECTIONS.forEach((s) => s.fields.forEach((f) => { init[f.key] = f.defaultValue }))
    return init
  })

  const [saving, setSaving] = useState<string | null>(null)

  const handleSave = (sectionTitle: string) => {
    setSaving(sectionTitle)
    setTimeout(() => setSaving(null), 800)
  }

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-semibold text-text">系统配置</h1>

      {SECTIONS.map((section) => (
        <div
          key={section.title}
          className="bg-card border border-border-light rounded-[--radius-md] p-5"
        >
          <h2 className="text-sm font-semibold text-text mb-4">{section.title}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {section.fields.map((field) => (
              <div key={field.key} className="space-y-1.5">
                <label className="block text-xs font-medium text-text-secondary">
                  {field.label}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type={field.type}
                    value={values[field.key]}
                    onChange={(e) =>
                      setValues((prev) => ({
                        ...prev,
                        [field.key]: field.type === 'number' ? e.target.value : e.target.value,
                      }))
                    }
                    className="flex-1 h-9 px-3 text-sm rounded-[--radius-sm] border border-border bg-bg text-text placeholder:text-text-tertiary outline-none focus:border-accent transition-colors"
                  />
                  {field.suffix && (
                    <span className="text-xs text-text-tertiary whitespace-nowrap">
                      {field.suffix}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={() => handleSave(section.title)}
              disabled={saving === section.title}
              className="px-4 py-1.5 text-sm font-medium rounded-[--radius-sm] bg-accent text-white hover:opacity-90 disabled:opacity-60 transition-opacity"
            >
              {saving === section.title ? '已保存' : '保存'}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
