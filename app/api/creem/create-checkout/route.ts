import { NextRequest, NextResponse } from 'next/server';
import { createCreemSDK } from '@/lib/crem';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type { Database } from '@/types/supabase';

export async function POST(request: NextRequest) {
  try {
    // 验证用户身份
    const supabase = createServerComponentClient<Database>({ cookies });
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // 获取请求参数
    const { product_id, request_id, success_url } = await request.json();

    if (!product_id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    // 创建Creem SDK实例
    const creem = createCreemSDK();

    // 创建checkout session
    const checkout = await creem.createCheckout({
      product_id,
      request_id: request_id || `checkout-${user.id}-${Date.now()}`,
      success_url: success_url || `${process.env.NEXTAUTH_URL}/overview?payment=success`,
      customer_email: user.email,
      metadata: {
        user_id: user.id,
        user_email: user.email,
      },
    });

    return NextResponse.json({
      success: true,
      checkout_id: checkout.id,
      checkout_url: checkout.url,
    });

  } catch (error) {
    console.error('Creem checkout creation error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to create checkout session',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 