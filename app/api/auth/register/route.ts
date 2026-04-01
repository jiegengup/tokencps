import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { generateInviteCode, validateEmail, validatePhone, validatePassword } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phone, email, password, confirmPassword, inviteCode } = body;

    // 验证必填字段
    if (!phone || !email || !password || !confirmPassword) {
      return NextResponse.json(
        { success: false, message: '请填写完整信息' },
        { status: 400 }
      );
    }

    // 验证手机号
    if (!validatePhone(phone)) {
      return NextResponse.json(
        { success: false, message: '手机号格式不正确' },
        { status: 400 }
      );
    }

    // 验证邮箱
    if (!validateEmail(email)) {
      return NextResponse.json(
        { success: false, message: '邮箱格式不正确' },
        { status: 400 }
      );
    }

    // 验证密码
    if (!validatePassword(password)) {
      return NextResponse.json(
        { success: false, message: '密码长度应为6-20位' },
        { status: 400 }
      );
    }

    // 验证密码一致性
    if (password !== confirmPassword) {
      return NextResponse.json(
        { success: false, message: '两次密码输入不一致' },
        { status: 400 }
      );
    }

    // TODO: 检查手机号和邮箱是否已存在（需要数据库）
    
    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);

    // 生成邀请码
    const userInviteCode = generateInviteCode();

    // TODO: 保存到数据库
    const newUser = {
      id: Math.random().toString(36).substring(7),
      phone,
      email,
      password: hashedPassword,
      inviteCode: userInviteCode,
      invitedBy: inviteCode || null,
      role: 'user' as const,
      status: 'active' as const,
      balance: 0,
      totalEarnings: 0,
      createdAt: new Date(),
    };

    return NextResponse.json({
      success: true,
      message: '注册成功',
      data: {
        id: newUser.id,
        phone: newUser.phone,
        email: newUser.email,
        inviteCode: newUser.inviteCode,
      },
    });
  } catch (error) {
    console.error('注册失败:', error);
    return NextResponse.json(
      { success: false, message: '注册失败，请稍后重试' },
      { status: 500 }
    );
  }
}
