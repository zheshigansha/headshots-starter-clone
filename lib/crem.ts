export interface CremConfig {
  apiKey: string;
  baseUrl: string;
  isTestMode: boolean;
}

export interface CremProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
}

export interface CremCheckoutRequest {
  product_id: string;
  request_id?: string;
  success_url?: string;
  customer_email?: string;
  metadata?: Record<string, any>;
}

export interface CremCheckoutResponse {
  id: string;
  url: string;
  product_id: string;
  request_id?: string;
  status: 'pending' | 'completed' | 'expired';
  created_at: string;
  expires_at: string;
}

export interface CremReturnUrlParams {
  checkout_id: string;
  order_id: string;
  customer_id: string;
  subscription_id?: string;
  product_id: string;
  request_id?: string;
  signature: string;
  status: 'success' | 'failed';
}

export interface CremWebhookEvent {
  id: string;
  type: 'checkout.completed' | 'checkout.failed' | 'payment.succeeded' | 'payment.failed';
  data: {
    checkout_id: string;
    order_id: string;
    customer_id: string;
    product_id: string;
    request_id?: string;
    amount: number;
    currency: string;
  };
  created_at: string;
}

export class CremSDK {
  private config: CremConfig;

  constructor(config: CremConfig) {
    this.config = config;
  }

  private async makeRequest(endpoint: string, method: 'GET' | 'POST' = 'GET', body?: any) {
    const url = `${this.config.baseUrl}${endpoint}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'x-api-key': this.config.apiKey,
    };

    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Creem API Error: ${error.message || response.statusText}`);
    }

    return response.json();
  }

  async createCheckout(request: CremCheckoutRequest): Promise<CremCheckoutResponse> {
    return this.makeRequest('/v1/checkouts', 'POST', request);
  }

  async getCheckout(checkoutId: string): Promise<CremCheckoutResponse> {
    return this.makeRequest(`/v1/checkouts/${checkoutId}`);
  }

  async createProduct(product: Omit<CremProduct, 'id'>): Promise<CremProduct> {
    return this.makeRequest('/v1/products', 'POST', product);
  }

  async getProduct(productId: string): Promise<CremProduct> {
    return this.makeRequest(`/v1/products/${productId}`);
  }

  verifyReturnUrl(params: CremReturnUrlParams): boolean {
    // 实现签名验证逻辑
    // 根据Creem文档，signature包含了所有参数的签名
    // 这里是简化实现，实际需要根据Creem的具体签名算法实现
    return Boolean(params.signature && params.signature.length > 0);
  }

  parseReturnUrl(url: string): CremReturnUrlParams | null {
    try {
      const urlObj = new URL(url);
      const params = Object.fromEntries(urlObj.searchParams);
      
      return {
        checkout_id: params.checkout_id,
        order_id: params.order_id,
        customer_id: params.customer_id,
        subscription_id: params.subscription_id,
        product_id: params.product_id,
        request_id: params.request_id,
        signature: params.signature,
        status: params.status as 'success' | 'failed',
      };
    } catch (error) {
      return null;
    }
  }
}

// 获取Creem配置
export function getCreemConfig(): CremConfig {
  const apiKey = process.env.CREEM_API_KEY;
  const baseUrl = process.env.CREEM_BASE_URL || (process.env.CREEM_TEST_MODE === 'true' ? 'https://api.creem.io/v1' : 'https://api.creem.io/v1');
  const isTestMode = process.env.CREEM_TEST_MODE === 'true';

  if (!apiKey) {
    throw new Error('Missing required Creem environment variables: CREEM_API_KEY');
  }

  return {
    apiKey,
    baseUrl,
    isTestMode,
  };
}

// 创建Creem SDK实例
export function createCreemSDK(): CremSDK {
  const config = getCreemConfig();
  return new CremSDK(config);
}

// 验证Creem是否已配置
export function isCreemEnabled(): boolean {
  return process.env.NEXT_PUBLIC_CREEM_IS_ENABLED === 'true';
} 