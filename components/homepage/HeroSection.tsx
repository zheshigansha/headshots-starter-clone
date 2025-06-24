"use client";

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import TrustBadges from "@/components/homepage/trust-badges"
import ThreeDBeforeAfterGallery from "@/components/homepage/3d-before-after-gallery"
import { useI18n } from "@/lib/i18n"
import { useEffect, useState } from "react"

export default function HeroSection() {
  const { t, hasHydrated } = useI18n();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // 在hydration完成前显示英文内容，避免SSR mismatch
  const getText = (key: string, fallback: string) => {
    if (!isClient || !hasHydrated) {
      return fallback;
    }
    return t(key);
  };
  
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center mb-8">
          <Badge className="mb-4" variant="outline">
            {getText('hero.badge', 'THE #1 RANKED AI HEADSHOT COMPANY')}
          </Badge>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6">
            {getText('hero.title', 'The Leading AI Headshot Generator for')} <span className="text-primary">{getText('hero.titleHighlight', 'Professionals')}</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-[800px] mx-auto">
            {getText('hero.subtitle', 'Turn your selfies into studio-quality headshots in minutes. Save hundreds of dollars and hours of your time.')}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/login" className="w-full sm:w-auto">
              <Button size="lg" className="group">
                {getText('hero.getStarted', 'Create your headshots now')}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Trust Badges */}
        {/* <div className="mt-8">
          <TrustBadges />
        </div> */}

        <div className="mt-12">
          <ThreeDBeforeAfterGallery />
        </div>
      </div>
    </section>
  )
}