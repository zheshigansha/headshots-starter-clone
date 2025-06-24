import { NextRequest, NextResponse } from 'next/server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type { Database } from '@/types/supabase';
import type { CremWebhookEvent, CremReturnUrlParams } from '@/lib/crem';

// 信用额度包配置
const CREDIT_PACKAGES: Record<string, number> = {
  [process.env.NEXT_PUBLIC_CREEM_PRODUCT_1_CREDIT || '']: 1,
  [process.env.NEXT_PUBLIC_CREEM_PRODUCT_3_CREDITS || '']: 3,
  [process.env.NEXT_PUBLIC_CREEM_PRODUCT_5_CREDITS || '']: 5,
};

export async function POST(request: NextRequest) {
  try {
    // 解析webhook数据
    const webhookData: CremWebhookEvent = await request.json();
    
    console.log('Creem webhook received:', webhookData);

    // 只处理支付成功事件
    if (webhookData.type !== 'checkout.completed' && webhookData.type !== 'payment.succeeded') {
      return NextResponse.json({ received: true });
    }

    const { data } = webhookData;
    const { customer_id, product_id, request_id } = data;

    // 从request_id中提取user_id
    const userId = extractUserIdFromMetadata(request_id);
    if (!userId) {
      console.error('Unable to extract user ID from webhook data');
      return NextResponse.json({ error: 'Invalid user data' }, { status: 400 });
    }

    // 获取要添加的信用额度
    const creditsToAdd = CREDIT_PACKAGES[product_id];
    if (!creditsToAdd) {
      console.error('Unknown product ID:', product_id);
      return NextResponse.json({ error: 'Unknown product' }, { status: 400 });
    }

    // 创建Supabase客户端
    const supabase = createServerComponentClient<Database>({ cookies });

    // 获取用户当前信用额度
    const { data: currentCredits, error: fetchError } = await supabase
      .from('credits')
      .select('credits')
      .eq('user_id', userId)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error fetching user credits:', fetchError);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    const newCreditsTotal = (currentCredits?.credits || 0) + creditsToAdd;

    // 更新或插入用户信用额度
    const { error: upsertError } = await supabase
      .from('credits')
      .upsert({
        user_id: userId,
        credits: newCreditsTotal,
      }, {
        onConflict: 'user_id'
      });

    if (upsertError) {
      console.error('Error updating user credits:', upsertError);
      return NextResponse.json({ error: 'Failed to update credits' }, { status: 500 });
    }

    // TODO: 可以在这里添加支付历史记录功能
    // 需要先在数据库中创建payment_history表

    console.log(`Successfully added ${creditsToAdd} credits to user ${userId}. New total: ${newCreditsTotal}`);

    return NextResponse.json({ 
      success: true, 
      credits_added: creditsToAdd,
      new_total: newCreditsTotal 
    });

  } catch (error) {
    console.error('Creem webhook processing error:', error);
    
    return NextResponse.json(
      { 
        error: 'Webhook processing failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// 从request_id中提取用户ID
function extractUserIdFromMetadata(requestId?: string): string | null {
  if (!requestId) return null;
  
  // 格式：credits-{package_id}-{timestamp} 或包含用户ID的其他格式
  // 这里需要根据实际的request_id格式来解析
  // 暂时返回null，需要在实际使用时根据具体格式调整
  
  return null;
}

// 处理成功返回URL的GET请求
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // 解析返回URL参数
    const returnParams: CremReturnUrlParams = {
      checkout_id: searchParams.get('checkout_id') || '',
      order_id: searchParams.get('order_id') || '',
      customer_id: searchParams.get('customer_id') || '',
      product_id: searchParams.get('product_id') || '',
      subscription_id: searchParams.get('subscription_id') || undefined,
      request_id: searchParams.get('request_id') || undefined,
      signature: searchParams.get('signature') || '',
      status: searchParams.get('status') as 'success' | 'failed' || 'success',
    };

    // 验证必要参数
    if (!returnParams.checkout_id || !returnParams.order_id || !returnParams.product_id) {
      return NextResponse.redirect(new URL('/overview?payment=failed', request.url));
    }

    // 这里可以添加签名验证逻辑
    
    // 重定向到成功页面
    if (returnParams.status === 'success') {
      return NextResponse.redirect(new URL('/overview?payment=success', request.url));
    } else {
      return NextResponse.redirect(new URL('/overview?payment=failed', request.url));
    }

  } catch (error) {
    console.error('Return URL processing error:', error);
    return NextResponse.redirect(new URL('/overview?payment=error', request.url));
  }
} 