"use client";

import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TestI18nPage() {
  const { t, locale, setLocale } = useI18n();

  return (
    <div className="container mx-auto py-8 space-y-6">
      <h1 className="text-3xl font-bold">双语系统测试 / Bilingual System Test</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>当前语言 / Current Language: {locale}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button 
              onClick={() => setLocale('en')}
              variant={locale === 'en' ? 'default' : 'outline'}
            >
              English
            </Button>
            <Button 
              onClick={() => setLocale('zh')}
              variant={locale === 'zh' ? 'default' : 'outline'}
            >
              中文
            </Button>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">测试文本 / Test Text:</h3>
            <p><strong>品牌名:</strong> {t('nav.brand')}</p>
            <p><strong>登录:</strong> {t('nav.login')}</p>
            <p><strong>欢迎标题:</strong> {t('login.title')}</p>
            <p><strong>副标题:</strong> {t('login.subtitle')}</p>
            <p><strong>页脚描述:</strong> {t('footer.description')}</p>
            <p><strong>公告信息:</strong> {t('announcement.message')}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 