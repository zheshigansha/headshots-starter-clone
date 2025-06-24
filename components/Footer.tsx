"use client";

import { Camera } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export default function Footer() {
  const { t } = useI18n();
  
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg mb-4">
              <Camera className="h-5 w-5 text-primary" />
              <span translate="no">{t('nav.brand')}</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              {t("footer.description")}
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">{t("footer.product")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/overview" className="text-muted-foreground hover:text-foreground">
                  {t("footer.dashboard")}
                </Link>
              </li>
              <li>
                <Link href="/overview/models" className="text-muted-foreground hover:text-foreground">
                  {t("footer.models")}
                </Link>
              </li>
              <li>
                <Link href="/overview/packs" className="text-muted-foreground hover:text-foreground">
                  {t("footer.packs")}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">{t("footer.resources")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/docs" className="text-muted-foreground hover:text-foreground">
                  {t("footer.documentation")}
                </Link>
              </li>
              <li>
                <Link href="/api" className="text-muted-foreground hover:text-foreground">
                  {t("footer.apiReference")}
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-muted-foreground hover:text-foreground">
                  {t("footer.support")}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">{t("footer.company")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  {t("footer.about")}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                  {t("footer.privacyPolicy")}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                  {t("footer.termsOfService")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2024 <span translate="no">{t('nav.brand')}</span>. {t("footer.allRightsReserved")}</p>
        </div>
      </div>
    </footer>
  );
}
