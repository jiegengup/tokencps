import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { account, password } = body;

    // 验证必填字段
    if (!account || !password) {
      return NextResponse.json(
        { success: false, message: '请输入账号和密码' },
        { status: 400 }
      );
    }

    // TODO: 从数据库查询用户
    // 这里使用 Mock 数据演示（支持多个测试账号）
    const hash123 = await bcrypt.hash('123', 10);

    const mockUsers: Record<string, any> = {
      '13800138000': {
        id: '1',
        phone: '13800138000',
        email: 'demo@tokencps.com',
        username: 'admin',
        password: await bcrypt.hash('demo123', 10),
        nickname: '管理员',
        role: 'admin' as const,
        status: 'active' as const,
        inviteCode: 'DEMO001',
        balance: 1580.50,
        totalEarnings: 15680.00,
      },
      'ceshi1': {
        id: '2',
        phone: '13800138001',
        email: 'ceshi1@tokencps.com',
        username: 'ceshi1',
        password: hash123,
        nickname: '管理员C端',
        role: 'admin' as const,
        status: 'active' as const,
        inviteCode: 'CESHI01',
        balance: 0,
        totalEarnings: 0,
      },
      'ceshi2': {
        id: '3',
        phone: '13800138002',
        email: 'ceshi2@tokencps.com',
        username: 'ceshi2',
        password: hash123,
        nickname: '推广员B端',
        role: 'user' as const,
        status: 'active' as const,
        inviteCode: 'CESHI02',
        balance: 500.00,
        totalEarnings: 3200.00,
      },
    };

    // alias: demo@tokencps.com 和 admin 指向同一用户
    mockUsers['demo@tokencps.com'] = mockUsers['13800138000'];
    mockUsers['admin'] = mockUsers['13800138000'];

    const mockUser = mockUsers[account];

    // 检查账号是否存在
    if (!mockUser) {
      return NextResponse.json(
        { success: false, message: '账号或密码错误' },
        { status: 401 }
      );
    }

    // 验证密码
    const isPasswordValid = await bcrypt.compare(password, mockUser.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: '账号或密码错误' },
        { status: 401 }
      );
    }

    // 检查账号状态
    if (mockUser.status !== 'active') {
      return NextResponse.json(
        { success: false, message: '账号已被禁用，请联系客服' },
        { status: 403 }
      );
    }

    // 生成 JWT Token
    const token = jwt.sign(
      {
        id: mockUser.id,
        phone: mockUser.phone,
        email: mockUser.email,
        role: mockUser.role,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // 返回用户信息和 Token
    return NextResponse.json({
      success: true,
      message: '登录成功',
      data: {
        token,
        user: {
          id: mockUser.id,
          phone: mockUser.phone,
          email: mockUser.email,
          nickname: mockUser.nickname,
          role: mockUser.role,
          inviteCode: mockUser.inviteCode,
          balance: mockUser.balance,
          totalEarnings: mockUser.totalEarnings,
        },
      },
    });
  } catch (error) {
    console.error('登录失败:', error);
    return NextResponse.json(
      { success: false, message: '登录失败，请稍后重试' },
      { status: 500 }
    );
  }
}
