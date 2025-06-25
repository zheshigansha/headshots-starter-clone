'use client';
import { useUser } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { isCreemEnabled } from '@/lib/crem';
import { useI18n } from '@/lib/i18n';

interface CreditPackage {
  id: string;
  credits: number;
  price: number;
  currency: string;
  popular?: boolean;
  description: string;
  productId?: string; // Creem product ID
}

const creditPackages: CreditPackage[] = [
  {
    id: '1-credit',
    credits: 1,
    price: 5,
    currency: 'USD',
    description: 'Perfect for trying out the service',
    productId: process.env.NEXT_PUBLIC_CREEM_PRODUCT_1_CREDIT,
  },
  {
    id: '3-credits',
    credits: 3,
    price: 12,
    currency: 'USD',
    popular: true,
    description: 'Most popular choice for regular users',
    productId: process.env.NEXT_PUBLIC_CREEM_PRODUCT_3_CREDITS,
  },
  {
    id: '5-credits',
    credits: 5,
    price: 18,
    currency: 'USD',
    description: 'Best value for power users',
    productId: process.env.NEXT_PUBLIC_CREEM_PRODUCT_5_CREDITS,
  },
];

export default function GetCreditsPage() {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();
  const { t } = useI18n();
  const user = useUser();
  const isPaymentEnabled = isCreemEnabled();

  const handlePurchase = async (pkg: CreditPackage) => {
    if (!user) {
      // 跳转到登录页，并带上付款意图参数
      router.push(`/login?redirectTo=/get-credits?pay=${pkg.id}`);
      return;
    }
    if (!pkg.productId) {
      toast({
        title: "Configuration Error",
        description: "Product not configured. Please contact support.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(pkg.id);

    try {
      // 创建Creem checkout session
      const response = await fetch('/api/creem/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: pkg.productId,
          request_id: `credits-${pkg.id}-${Date.now()}`,
          success_url: `${window.location.origin}/overview?payment=success`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { checkout_url } = await response.json();
      
      // 重定向到Creem支付页面
      window.location.href = checkout_url;
      
    } catch (error) {
      console.error('Purchase error:', error);
      toast({
        title: "Payment Error",
        description: "Failed to initiate payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(null);
    }
  };

  if (!isPaymentEnabled) {
    return (
      <div className="flex flex-1 flex-col w-full items-center justify-center p-8 space-y-4">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">{t('credits.title')}</h1>
          <p className="text-muted-foreground max-w-md">
            {t('credits.disabled')}
          </p>
        </div>
        <Button onClick={() => router.push('/overview')} variant="outline">
          {t('common.goBack')}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col w-full max-w-4xl mx-auto p-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">{t('credits.title')}</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {t('credits.description')}
        </p>
      </div>

      {/* Credit Packages */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {creditPackages.map((pkg) => (
          <Card 
            key={pkg.id} 
            className={`relative transition-all duration-200 hover:shadow-lg ${
              pkg.popular ? 'ring-2 ring-primary' : ''
            }`}
          >
            {pkg.popular && (
              <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary">
                {t('credits.popular')}
              </Badge>
            )}
            
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl">
                {pkg.credits} {t('credits.credits')}
              </CardTitle>
              <CardDescription className="text-sm">
                {pkg.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="text-center space-y-4">
              <div className="space-y-1">
                <div className="text-3xl font-bold">
                  ${pkg.price}
                </div>
                <div className="text-sm text-muted-foreground">
                  ${(pkg.price / pkg.credits).toFixed(2)} {t('credits.perCredit')}
                </div>
              </div>
              
              <Button 
                className="w-full" 
                onClick={() => handlePurchase(pkg)}
                disabled={isLoading === pkg.id || !pkg.productId}
                size="lg"
              >
                {isLoading === pkg.id ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    {t('credits.processing')}
                  </div>
                ) : (
                  t('credits.buyNow')
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Features */}
      <div className="bg-muted/50 rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-semibold text-center">{t('credits.whatIncluded')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-green-500 rounded-full" />
            <span>{t('credits.feature1')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-green-500 rounded-full" />
            <span>{t('credits.feature2')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-green-500 rounded-full" />
            <span>{t('credits.feature3')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-green-500 rounded-full" />
            <span>{t('credits.feature4')}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-muted-foreground space-y-2">
        <p>{t('credits.securePayment')}</p>
        <p>{t('credits.instantDelivery')}</p>
      </div>
    </div>
  );
}
