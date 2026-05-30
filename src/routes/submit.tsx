import { useMemo, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

type SubmissionType = "streamer" | "team" | "participant";

interface FormValues {
  name: string;
  telegramUsername: string;
  tiktokUsername?: string;
  age?: string;
  streamExperience?: string;
  about?: string;
  teamDirection?: string;
  teamExperience?: string;
  joinReason?: string;
  interestDirection?: string;
  message?: string;
}

const titles: Record<SubmissionType, { title: string; description: string }> = {
  streamer: {
    title: "Стать частью NovaBoost",
    description:
      "Расскажите немного о себе. Мы рассмотрим заявку и свяжемся с вами.",
  },
  team: {
    title: "Присоединиться к команде NovaBoost",
    description:
      "Ищем активных людей, которые хотят развивать экосистему вместе с нами.",
  },
  participant: {
    title: "Получить доступ к экосистеме",
    description:
      "Оставьте контакты и мы расскажем подробнее о возможностях NovaBoost.",
  },
};

function getQueryType(): SubmissionType {
  if (typeof window === "undefined") return "streamer";

  const params = new URLSearchParams(window.location.search);
  const type = params.get("type");

  if (type === "team" || type === "participant") return type;
  return "streamer";
}

function clean(value?: string) {
  return value?.trim() || "";
}

export const Route = createFileRoute("/submit")({
  head: () => ({
    meta: [
      { title: "Форма заявки — NovaBoost" },
      { name: "description", content: "Оставьте заявку в NovaBoost" },
    ],
  }),
  component: SubmitPage,
});

function SubmitPage() {
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
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
      telegramUsername: "",
      tiktokUsername: "",
      age: "",
      streamExperience: "",
      about: "",
      teamDirection: "",
      teamExperience: "",
      joinReason: "",
      interestDirection: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setSubmitError("");

    const payload = {
      type: formType,
      name: clean(data.name),
      telegramUsername: clean(data.telegramUsername),
      tiktokUsername: clean(data.tiktokUsername),
      age: clean(data.age),
      streamExperience: clean(data.streamExperience),
      about: clean(data.about),
      teamDirection: clean(data.teamDirection),
      teamExperience: clean(data.teamExperience),
      joinReason: clean(data.joinReason),
      interestDirection: clean(data.interestDirection),
      message: clean(data.message),
      pageUrl: typeof window === "undefined" ? "/submit" : window.location.href,
      referrer:
        typeof window === "undefined" ? "direct" : document.referrer || "direct",
      userAgent:
        typeof window === "undefined" ? "" : window.navigator.userAgent,
      consent: true,
    };

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("submit_failed");
      }

      setSuccess(true);
      reset();
    } catch {
      setSubmitError(
        "Не удалось отправить заявку. Попробуйте еще раз через пару минут.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-background py-16">
      <main className="mx-auto max-w-3xl rounded-[2rem] border border-border bg-surface p-8 shadow-xl">
        <div className="mb-6 flex flex-col gap-3">
          <Link to="/" className="text-sm text-primary hover:underline">
            Вернуться на главную
          </Link>
          <h1 className="text-4xl font-bold text-foreground">{title}</h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        <section className="mb-8 rounded-3xl border border-border bg-muted/10 p-6 text-sm text-muted-foreground">
          <h2 className="mb-2 font-semibold text-foreground">Что дальше?</h2>
          <p>
            После отправки заявки мы изучим информацию и свяжемся с вами через
            Telegram или другой удобный способ связи. Обычно ответ занимает от
            нескольких часов до 2 рабочих дней.
          </p>
        </section>

        {success ? (
          <section className="rounded-3xl border border-primary/20 bg-primary/10 p-6 text-foreground">
            <h2 className="mb-3 text-xl font-semibold">Спасибо за заявку! 🎉</h2>
            <p className="text-sm text-muted-foreground">
              Мы получили вашу информацию и свяжемся с вами после рассмотрения.
              Следите за сообщениями в Telegram.
            </p>
            <div className="mt-6">
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Вернуться на главную
              </Link>
            </div>
          </section>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {formType === "streamer" && (
              <>
                <label className="space-y-2 text-sm text-foreground">
                  <span>TikTok Username *</span>
                  <input
                    type="text"
                    autoComplete="username"
                    {...register("tiktokUsername", {
                      required: "Укажите TikTok username",
                    })}
                    className="w-full rounded-3xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
                  />
                  {errors.tiktokUsername && (
                    <span className="text-xs text-destructive">
                      {errors.tiktokUsername.message}
                    </span>
                  )}
                </label>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="space-y-2 text-sm text-foreground">
                    <span>Имя *</span>
                    <input
                      type="text"
                      autoComplete="name"
                      {...register("name", { required: "Укажите имя" })}
                      className="w-full rounded-3xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
                    />
                    {errors.name && (
                      <span className="text-xs text-destructive">
                        {errors.name.message}
                      </span>
                    )}
                  </label>

                  <label className="space-y-2 text-sm text-foreground">
                    <span>Telegram *</span>
                    <input
                      type="text"
                      autoComplete="username"
                      {...register("telegramUsername", {
                        required: "Укажите Telegram",
                      })}
                      className="w-full rounded-3xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
                    />
                    {errors.telegramUsername && (
                      <span className="text-xs text-destructive">
                        {errors.telegramUsername.message}
                      </span>
                    )}
                  </label>
                </div>

                <label className="space-y-2 text-sm text-foreground">
                  <span>Возраст</span>
                  <input
                    type="number"
                    min="13"
                    max="99"
                    {...register("age")}
                    className="w-full rounded-3xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
                  />
                </label>

                <label className="space-y-2 text-sm text-foreground">
                  <span>Опыт проведения эфиров</span>
                  <textarea
                    rows={4}
                    {...register("streamExperience")}
                    className="w-full rounded-3xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
                  />
                </label>

                <label className="space-y-2 text-sm text-foreground">
                  <span>О себе</span>
                  <textarea
                    rows={5}
                    {...register("about")}
                    className="w-full rounded-3xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
                  />
                </label>
              </>
            )}

            {formType === "team" && (
              <>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="space-y-2 text-sm text-foreground">
                    <span>Имя *</span>
                    <input
                      type="text"
                      autoComplete="name"
                      {...register("name", { required: "Укажите имя" })}
                      className="w-full rounded-3xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
                    />
                    {errors.name && (
                      <span className="text-xs text-destructive">
                        {errors.name.message}
                      </span>
                    )}
                  </label>

                  <label className="space-y-2 text-sm text-foreground">
                    <span>Telegram *</span>
                    <input
                      type="text"
                      autoComplete="username"
                      {...register("telegramUsername", {
                        required: "Укажите Telegram",
                      })}
                      className="w-full rounded-3xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
                    />
                    {errors.telegramUsername && (
                      <span className="text-xs text-destructive">
                        {errors.telegramUsername.message}
                      </span>
                    )}
                  </label>
                </div>

                <label className="space-y-2 text-sm text-foreground">
                  <span>Направление *</span>
                  <input
                    type="text"
                    {...register("teamDirection", {
                      required: "Укажите направление",
                    })}
                    className="w-full rounded-3xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
                  />
                  {errors.teamDirection && (
                    <span className="text-xs text-destructive">
                      {errors.teamDirection.message}
                    </span>
                  )}
                </label>

                <label className="space-y-2 text-sm text-foreground">
                  <span>Опыт *</span>
                  <textarea
                    rows={4}
                    {...register("teamExperience", {
                      required: "Расскажите об опыте",
                    })}
                    className="w-full rounded-3xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
                  />
                  {errors.teamExperience && (
                    <span className="text-xs text-destructive">
                      {errors.teamExperience.message}
                    </span>
                  )}
                </label>

                <label className="space-y-2 text-sm text-foreground">
                  <span>Почему хотите присоединиться?</span>
                  <textarea
                    rows={5}
                    {...register("joinReason")}
                    className="w-full rounded-3xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
                  />
                </label>
              </>
            )}

            {formType === "participant" && (
              <>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="space-y-2 text-sm text-foreground">
                    <span>Имя *</span>
                    <input
                      type="text"
                      autoComplete="name"
                      {...register("name", { required: "Укажите имя" })}
                      className="w-full rounded-3xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
                    />
                    {errors.name && (
                      <span className="text-xs text-destructive">
                        {errors.name.message}
                      </span>
                    )}
                  </label>

                  <label className="space-y-2 text-sm text-foreground">
                    <span>Telegram *</span>
                    <input
                      type="text"
                      autoComplete="username"
                      {...register("telegramUsername", {
                        required: "Укажите Telegram",
                      })}
                      className="w-full rounded-3xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
                    />
                    {errors.telegramUsername && (
                      <span className="text-xs text-destructive">
                        {errors.telegramUsername.message}
                      </span>
                    )}
                  </label>
                </div>

                <label className="space-y-2 text-sm text-foreground">
                  <span>Интересующее направление</span>
                  <input
                    type="text"
                    {...register("interestDirection")}
                    className="w-full rounded-3xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
                  />
                </label>

                <label className="space-y-2 text-sm text-foreground">
                  <span>Комментарий</span>
                  <textarea
                    rows={5}
                    {...register("message")}
                    className="w-full rounded-3xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
                  />
                </label>
              </>
            )}

            {submitError && (
              <p className="rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {submitError}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center rounded-3xl bg-primary px-5 py-4 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Отправляем..." : "Отправить заявку"}
            </button>
          </form>
        )}
      </main>
    </div>
  );
}
