import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export const WaitingForMagicLink = ({
  toggleState,
}: {
  toggleState: () => void;
}) => {
  const { t } = useI18n();
  
  return (
    <>
      <div className="flex items-center justify-center p-8">
        <div className="flex flex-col gap-4 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 p-4 rounded-xl max-w-sm w-full">
          <h1 className="text-xl">{t("waitingForMagicLink.title")}</h1>
          <div className="flex flex-col gap-2">
            <p className="text-sm">
              {t("waitingForMagicLink.description")}
            </p>
            <p className="text-xs opacity-60">
              {t("waitingForMagicLink.hint")}
            </p>
          </div>
          <div>
            <Button onClick={toggleState} variant="secondary" size="sm">
              <ArrowLeft size={14} />
              {t("waitingForMagicLink.goBack")}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
