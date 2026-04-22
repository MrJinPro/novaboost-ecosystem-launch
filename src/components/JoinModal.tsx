import { useState } from "react";

const roles = ["Стример", "Куратор", "Преподаватель (Academy)", "Разработчик", "Дизайнер", "Другое"];

export function JoinModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);

  if (!open) return null;

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

        {submitted ? (
          <div className="py-12 text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-foreground">Заявка отправлена!</h3>
            <p className="mt-2 text-muted-foreground">Мы свяжемся с вами в ближайшее время.</p>
            <button onClick={onClose} className="btn-primary-glow mt-6 rounded-xl px-6 py-3 text-sm font-semibold">
              Закрыть
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-bold text-foreground">Присоединиться к NovaBoost</h3>
            <p className="mt-2 text-sm text-muted-foreground mb-6">Заполните форму и мы свяжемся с вами</p>

            <form
              onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Имя</label>
                <input
                  required
                  maxLength={100}
                  className="w-full rounded-xl bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                  placeholder="Ваше имя"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Telegram / Email</label>
                <input
                  required
                  maxLength={255}
                  className="w-full rounded-xl bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                  placeholder="@username или email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Откуда узнали о нас</label>
                <input
                  maxLength={200}
                  className="w-full rounded-xl bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                  placeholder="TikTok, друг, реклама..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Кем хотите стать</label>
                <select
                  required
                  className="w-full rounded-xl bg-input px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/50 transition-shadow appearance-none [&>option]:bg-background [&>option]:text-foreground"
                >
                  <option value="">Выберите роль</option>
                  {roles.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Кратко о себе</label>
                <textarea
                  maxLength={500}
                  rows={3}
                  className="w-full rounded-xl bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/50 transition-shadow resize-none"
                  placeholder="Расскажите немного о себе и вашем опыте..."
                />
              </div>

              <button
                type="submit"
                className="w-full btn-primary-glow rounded-xl py-3.5 text-sm font-bold mt-2"
              >
                Отправить заявку
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}