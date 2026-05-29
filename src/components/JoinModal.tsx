import { useState } from "react";

const STREAMER_APPLICATION_URL = "https://forms.gle/novaboost-streamer";

export function JoinModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [offerRead, setOfferRead] = useState(false);
  const [acceptOffer, setAcceptOffer] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  if (!open) return null;

  const canSubmit = offerRead && acceptOffer && acceptPrivacy && acceptTerms;

  const handleProceed = () => {
    if (!canSubmit) return;
    window.open(STREAMER_APPLICATION_URL, "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      <div
        className="relative z-10 w-full max-w-lg glass-strong rounded-3xl p-8 gradient-border max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors text-xl">
          ✕
        </button>

        <h3 className="text-2xl font-bold text-foreground">Заявка стримера</h3>
        <p className="mt-2 text-sm text-muted-foreground mb-6">
          Перед подачей заявки ознакомьтесь с документами и подтвердите согласие.
        </p>

        <div className="space-y-3">
          <a
            href="/offer"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOfferRead(true)}
            className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-surface/50 px-4 py-3 hover:border-primary/50 transition-colors"
          >
            <div>
              <div className="text-sm font-semibold text-foreground">Публичная оферта</div>
              <div className="text-xs text-muted-foreground">
                {offerRead ? "✓ Открыто" : "Откройте и прочитайте документ"}
              </div>
            </div>
            <span className="text-primary">↗</span>
          </a>

          <label className={`flex items-start gap-3 rounded-2xl border border-border p-4 transition-opacity ${!offerRead ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-primary/40"}`}>
            <input
              type="checkbox"
              checked={acceptOffer}
              disabled={!offerRead}
              onChange={(e) => setAcceptOffer(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-primary"
            />
            <span className="text-sm text-foreground/90">
              Я ознакомился(ась) с <strong>Публичной офертой</strong> и принимаю её условия
              {!offerRead && <span className="block text-xs text-muted-foreground mt-1">Сначала откройте документ выше</span>}
            </span>
          </label>

          <label className="flex items-start gap-3 rounded-2xl border border-border p-4 cursor-pointer hover:border-primary/40 transition-colors">
            <input
              type="checkbox"
              checked={acceptPrivacy}
              onChange={(e) => setAcceptPrivacy(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-primary"
            />
            <span className="text-sm text-foreground/90">
              Я согласен(на) с{" "}
              <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Политикой конфиденциальности
              </a>
            </span>
          </label>

          <label className="flex items-start gap-3 rounded-2xl border border-border p-4 cursor-pointer hover:border-primary/40 transition-colors">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-primary"
            />
            <span className="text-sm text-foreground/90">
              Я принимаю{" "}
              <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Условия использования
              </a>
            </span>
          </label>
        </div>

        <button
          type="button"
          disabled={!canSubmit}
          onClick={handleProceed}
          className="w-full btn-primary-glow rounded-xl py-3.5 text-sm font-bold mt-6 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Перейти к заявке
        </button>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Форма откроется в новой вкладке
        </p>
      </div>
    </div>
  );
}