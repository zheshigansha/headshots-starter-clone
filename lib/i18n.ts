import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Translation messages
const messages = {
  en: {
    nav: {
      brand: "Headshots AI",
      login: "Login",
      createHeadshots: "Create headshots",
      dashboard: "Dashboard",
      models: "Models",
      packs: "Packs"
    },
    login: {
      title: "Welcome",
      subtitle: "Sign in or create an account to get started.",
      continueWithGoogle: "Continue with Google",
      continueWithEmail: "Continue with Email",
      emailPlaceholder: "Email",
      or: "OR",
      emailSent: "Email sent",
      emailSentDescription: "Check your inbox for a magic link to sign in.",
      somethingWentWrong: "Something went wrong",
      tryAgainDescription: "Please try again, if the problem persists, contact us at hello@tryleap.ai"
    },
    waitingForMagicLink: {
      title: "Check your email to continue",
      description: "We've emailed you a magic link to access your account.",
      hint: "Hint: it might be in your spam folder.",
      goBack: "Go back"
    },
    announcement: {
      message: "We just improved our homepage, Packs now available and launched the image inspection feature!"
    },
    footer: {
      brand: "Headshots AI",
      description: "Professional AI-generated headshots in minutes.",
      product: "Product",
      resources: "Resources", 
      company: "Company",
      dashboard: "Dashboard",
      models: "Models",
      packs: "Packs",
      documentation: "Documentation",
      apiReference: "API Reference",
      support: "Support",
      about: "About",
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service",
      allRightsReserved: "All rights reserved"
    },
    hero: {
      badge: "THE #1 RANKED AI HEADSHOT COMPANY",
      title: "The Leading AI Headshot Generator for",
      titleHighlight: "Professionals",
      subtitle: "Turn your selfies into studio-quality headshots in minutes. Save hundreds of dollars and hours of your time.",
      getStarted: "Create your headshots now",
      learnMore: "Learn More"
    },
    features: {
      badge: "Features",
      title: "Everything You Need for Perfect Headshots",
      subtitle: "Get professional results without the hassle",
      fast: {
        title: "Fast Delivery",
        description: "Receive your photos in just 20 minutes"
      },
      quality: {
        title: "High Resolution",
        description: "Get print-ready images in stunning 4K resolution"
      },
      affordable: {
        title: "Commercial License",
        description: "Use your photos anywhere, including commercial purposes"
      },
      variety: {
        title: "Multiple Styles",
        description: "Choose from various professional styles and backgrounds"
      },
      enhancement: {
        title: "AI Enhancement",
        description: "Advanced AI technology for natural-looking results"
      }
    },
    pricing: {
      title: "Simple Pricing",
      subtitle: "Choose the plan that works for you",
      credits: "Credits",
      getStarted: "Get Started",
      popular: "Popular"
    },
    common: {
      loading: "Loading...",
      error: "Error",
      success: "Success",
      cancel: "Cancel",
      confirm: "Confirm",
      save: "Save",
      delete: "Delete",
      edit: "Edit",
      close: "Close",
      goBack: "Go Back"
    },
    credits: {
      title: "Buy Credits",
      description: "Purchase credits to generate amazing AI headshots",
      disabled: "Payment system is currently unavailable. Please try again later.",
      credits: "Credits",
      popular: "Most Popular",
      perCredit: "per credit",
      buyNow: "Buy Now",
      processing: "Processing...",
      whatIncluded: "What's Included",
      feature1: "High-quality AI headshots",
      feature2: "Multiple style options",
      feature3: "Fast processing",
      feature4: "Download in HD",
      securePayment: "Secure payment powered by Creem",
      instantDelivery: "Credits delivered instantly after payment"
    }
  },
  zh: {
    nav: {
      brand: "头像AI",
      login: "登录",
      createHeadshots: "创建头像",
      dashboard: "控制台",
      models: "模型",
      packs: "套装"
    },
    login: {
      title: "欢迎",
      subtitle: "登录或创建账户开始使用。",
      continueWithGoogle: "使用Google继续",
      continueWithEmail: "使用邮箱继续",
      emailPlaceholder: "邮箱",
      or: "或者",
      emailSent: "邮件已发送",
      emailSentDescription: "请查看您的邮箱，点击魔法链接登录。",
      somethingWentWrong: "出现错误",
      tryAgainDescription: "请重试，如果问题持续存在，请联系我们：hello@tryleap.ai"
    },
    waitingForMagicLink: {
      title: "请查看您的邮箱以继续",
      description: "我们已向您发送了一个魔法链接来访问您的账户。",
      hint: "提示：可能在您的垃圾邮件文件夹中。",
      goBack: "返回"
    },
    announcement: {
      message: "我们刚刚改进了主页，Packs现已可用，并推出了图像检查功能！"
    },
    footer: {
      brand: "头像AI", 
      description: "几分钟内生成专业的AI头像。",
      product: "产品",
      resources: "资源", 
      company: "公司",
      dashboard: "控制台",
      models: "模型",
      packs: "套装",
      documentation: "文档",
      apiReference: "API参考",
      support: "支持",
      about: "关于",
      privacyPolicy: "隐私政策",
      termsOfService: "服务条款",
      allRightsReserved: "版权所有"
    },
    hero: {
      badge: "排名第一的AI头像公司",
      title: "领先的专业",
      titleHighlight: "AI头像生成器",
      subtitle: "几分钟内将自拍转为工作室品质的头像。节省数百美元和大量时间。",
      getStarted: "立即创建头像",
      learnMore: "了解更多"
    },
    features: {
      badge: "功能特色",
      title: "完美头像所需的一切",
      subtitle: "轻松获得专业效果",
      fast: {
        title: "快速交付",
        description: "仅需20分钟即可收到您的照片"
      },
      quality: {
        title: "高清分辨率",
        description: "获得令人惊艳的4K分辨率打印级图像"
      },
      affordable: {
        title: "商业许可",
        description: "可在任何地方使用您的照片，包括商业用途"
      },
      variety: {
        title: "多种风格",
        description: "从各种专业风格和背景中选择"
      },
      enhancement: {
        title: "AI增强",
        description: "先进的AI技术带来自然逼真的效果"
      }
    },
    pricing: {
      title: "简单定价",
      subtitle: "选择适合您的计划",
      credits: "积分",
      getStarted: "开始使用",
      popular: "热门"
    },
    common: {
      loading: "加载中...",
      error: "错误",
      success: "成功",
      cancel: "取消",
      confirm: "确认",
      save: "保存",
      delete: "删除",
      edit: "编辑",
      close: "关闭",
      goBack: "返回"
    },
    credits: {
      title: "购买积分",
      description: "购买积分来生成精美的AI头像",
      disabled: "支付系统暂时不可用，请稍后再试。",
      credits: "积分",
      popular: "最受欢迎",
      perCredit: "每积分",
      buyNow: "立即购买",
      processing: "处理中...",
      whatIncluded: "包含内容",
      feature1: "高质量AI头像",
      feature2: "多种风格选择",
      feature3: "快速处理",
      feature4: "高清下载",
      securePayment: "由Creem提供安全支付",
      instantDelivery: "付款后即时交付积分"
    }
  }
} as const;

export type Locale = 'en' | 'zh';

interface I18nStore {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

export const useI18n = create<I18nStore>()(
  persist(
    (set, get) => ({
      locale: 'en' as Locale,
      hasHydrated: false,
      setHasHydrated: (state: boolean) => set({ hasHydrated: state }),
      setLocale: (locale: Locale) => set({ locale }),
      t: (key: string) => {
        const { locale } = get();
        const keys = key.split('.');
        let value: any = messages[locale];
        
        for (const k of keys) {
          value = value?.[k];
        }
        
        return value || key;
      },
    }),
    {
      name: 'language-storage',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

export const languages = [
  { code: 'en' as Locale, name: 'English', flag: '🇺🇸' },
  { code: 'zh' as Locale, name: '中文', flag: '🇨🇳' },
]; 