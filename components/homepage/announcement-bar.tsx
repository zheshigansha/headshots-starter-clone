"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { useI18n } from "@/lib/i18n"

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)
  const { t } = useI18n()

  if (!isVisible) return null

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 text-center text-sm relative">
      <p translate="no">
        {t("announcement.message")}
      </p>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 hover:opacity-70"
        aria-label="Close announcement"
      >
        <X size={16} />
      </button>
    </div>
  )
}


