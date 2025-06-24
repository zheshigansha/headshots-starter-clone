"use client";

import { Camera, Clock, Shield, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useI18n } from "@/lib/i18n"

export default function FeaturesSection() {
  const { t } = useI18n();

  const features = [
    {
      title: t('features.variety.title'),
      description: t('features.variety.description'),
      icon: <Camera className="h-6 w-6" />
    },
    {
      title: t('features.quality.title'),
      description: t('features.quality.description'),
      icon: <Camera className="h-6 w-6" />
    },
    {
      title: t('features.fast.title'),
      description: t('features.fast.description'),
      icon: <Clock className="h-6 w-6" />
    },
    {
      title: t('features.affordable.title'),
      description: t('features.affordable.description'),
      icon: <Shield className="h-6 w-6" />
    },
    {
      title: t('features.enhancement.title'),
      description: t('features.enhancement.description'),
      icon: <Star className="h-6 w-6" />
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">{t('features.badge')}</Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {t('features.title')}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 rounded-lg bg-background border">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}