import { useEffect, useMemo, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { saveSubmission, saveVisit, SubmissionType } from "@/lib/storage";

interface FormValues {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  tiktokUsername?: string;
  discordUsername?: string;
  telegramUsername?: string;
}

const titles: Record<SubmissionType, { title: string; description: string }> = {
  streamer: {
    title: "Заявка стримера",
    description: "Заполните форму для стримеров: TikTok username, имя, email и опционально Discord/Telegram.",
  },
  team: {
    title: "Заявка в команду",
    description: "Заполните форму, если хотите присоединиться к команде NovaBoost.",
  },
  participant: {
    title: "Заявка участника",
    description: "Заполните форму, чтобы получить доступ к материалам и предложениям для участников.",
  },
};

function getQueryType(): SubmissionType {
  if (typeof window === "undefined") return "streamer";

  const params = new URLSearchParams(window.location.search);
  const type = params.get("type");

  if (type === "team" || type === "participant") return type;
  return "streamer";
}

export const Route = createFileRoute("/submit")({
  head: () => ({
    meta: [
      { title: "Форма заявки — NovaBoost" },
      { name: "description", content: "Заполните заявку NovaBoost и сохраните данные локально" },
    ],
  }),
  component: SubmitPage,
});

function SubmitPage() {
  const [success, setSuccess] = useState(false);
  const formType = useMemo(getQueryType, []);
  const { title, description } = titles[formType];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const visit = {
      path: window.location.pathname + window.location.search,
      referrer: document.referrer || "direct",
      userAgent: window.navigator.userAgent,
      language: window.navigator.language,
    };

    // try to send to server, fallback to localStorage
    fetch('/api/visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(visit),
    }).catch(() => {
      saveVisit(visit as any);
    });
  }, [formType]);

  const onSubmit = async (data: FormValues) => {
    const payload = {
      type: formType,
      name: data.name.trim(),
      email: data.email.trim(),
      phone: data.phone?.trim() || '',
      message: data.message?.trim() || '',
      tiktokUsername: data.tiktokUsername?.trim() || '',
      discordUsername: data.discordUsername?.trim() || '',
      telegramUsername: data.telegramUsername?.trim() || '',
      pageUrl: typeof window === "undefined" ? "/submit" : window.location.href,
      referrer: typeof window === "undefined" ? "direct" : document.referrer || "direct",
      userAgent: typeof window === "undefined" ? "" : window.navigator.userAgent,
      consent: true,
    };

    try {
      const resp = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!resp.ok) throw new Error('server_error');
      // also save locally as a fallback copy
      saveSubmission({
        type: payload.type as any,
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        message: payload.message,
        tiktokUsername: payload.tiktokUsername,
        discordUsername: payload.discordUsername,
        telegramUsername: payload.telegramUsername,
        pageUrl: payload.pageUrl,
        referrer: payload.referrer,
        userAgent: payload.userAgent,
      });
      setSuccess(true);
      reset();
    } catch (err) {
      // fallback to local only
      saveSubmission({
        type: payload.type as any,
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        message: payload.message,
        tiktokUsername: payload.tiktokUsername,
        discordUsername: payload.discordUsername,
        telegramUsername: payload.telegramUsername,
        pageUrl: payload.pageUrl,
        referrer: payload.referrer,
        userAgent: payload.userAgent,
      });
      setSuccess(true);
      reset();
    }
  };

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-border bg-surface p-8 shadow-xl">
        <div className="mb-6 flex flex-col gap-3">
          <Link to="/" className="text-sm text-primary hover:underline">
            ← Вернуться на главную
          </Link>
          <h1 className="text-4xl font-bold text-foreground">{title}</h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        <div className="mb-8 rounded-3xl border border-border bg-muted/10 p-6 text-sm text-muted-foreground">
          <p className="font-semibold text-foreground mb-2">Важно</p>
          <p>Данные хранятся локально в браузере. После переноса на VPS мы подключим серверную базу данных и логирование IP.</p>
        </div>

        {success ? (
          <div className="rounded-3xl border border-primary/20 bg-primary/10 p-6 text-foreground">
            <h2 className="text-xl font-semibold mb-3">Заявка сохранена</h2>
            <p className="text-sm text-muted-foreground">Ваша заявка сохранена локально и будет видна в админке.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/" className="inline-flex items-center justify-center rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                На главную
              </Link>
              <Link to="/admin" className="inline-flex items-center justify-center rounded-2xl border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground hover:border-primary/70">
                В админку
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {formType === 'streamer' ? (
              <>
                <label className="space-y-2 text-sm text-foreground">
                  <span>TikTok username</span>
                  <input
                    type="text"
                    {...register('tiktokUsername', { required: 'Укажите TikTok username' })}
                    className="w-full rounded-3xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
                  />
                  {errors.tiktokUsername && <span className="text-xs text-destructive">{errors.tiktokUsername.message}</span>}
                </label>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="space-y-2 text-sm text-foreground">
                    <span>Имя</span>
                    <input
                      type="text"
                      {...register('name', { required: 'Укажите имя' })}
                      className="w-full rounded-3xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
                    />
                    {errors.name && <span className="text-xs text-destructive">{errors.name.message}</span>}
                  </label>
                  <label className="space-y-2 text-sm text-foreground">
                    <span>Email</span>
                    <input
                      type="email"
                      {...register('email', {
                        required: 'Укажите email',
                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Неверный формат email' },
                      })}
                      className="w-full rounded-3xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
                    />
                    {errors.email && <span className="text-xs text-destructive">{errors.email.message}</span>}
                  </label>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="space-y-2 text-sm text-foreground">
                    <span>Discord (не обязательно)</span>
                    <input
                      type="text"
                      {...register('discordUsername')}
                      className="w-full rounded-3xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
                    />
                  </label>
                  <label className="space-y-2 text-sm text-foreground">
                    <span>Telegram (не обязательно)</span>
                    <input
                      type="text"
                      {...register('telegramUsername')}
                      className="w-full rounded-3xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
                    />
                  </label>
                </div>
              </>
            ) : (
              <>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="space-y-2 text-sm text-foreground">
                    <span>Имя</span>
                    <input
                      type="text"
                      {...register('name', { required: 'Укажите имя' })}
                      className="w-full rounded-3xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
                    />
                    {errors.name && <span className="text-xs text-destructive">{errors.name.message}</span>}
                  </label>
                  <label className="space-y-2 text-sm text-foreground">
                    <span>Email</span>
                    <input
                      type="email"
                      {...register('email', {
                        required: 'Укажите email',
                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Неверный формат email' },
                      })}
                      className="w-full rounded-3xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
                    />
                    {errors.email && <span className="text-xs text-destructive">{errors.email.message}</span>}
                  </label>
                </div>

                <label className="space-y-2 text-sm text-foreground">
                  <span>Телефон</span>
                  <input
                    type="tel"
                    {...register('phone', { required: 'Укажите телефон' })}
                    className="w-full rounded-3xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
                  />
                  {errors.phone && <span className="text-xs text-destructive">{errors.phone.message}</span>}
                </label>
              </>
            )}

            <label className="space-y-2 text-sm text-foreground">
              <span>Комментарий</span>
              <textarea
                rows={5}
                {...register('message')}
                className="w-full rounded-3xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
              />
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center rounded-3xl bg-primary px-5 py-4 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Сохранить заявку
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
