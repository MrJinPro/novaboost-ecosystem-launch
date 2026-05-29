import { useState } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { JoinModal } from "./JoinModal";

const TEAM_FORM_URL = "https://forms.gle/novaboost-team";
const DOCS_URL = "/offer";

const scenarios = [
  {
    badge: "Стримеру",
    icon: "🎬",
    title: "Стать стримером NovaBoost",
    desc: "Хочу вступить в агентство и получить поддержку, обучение и инструменты для роста.",
    cta: "Подать заявку",
    action: "streamer" as const,
  },
  {
    badge: "Команда",
    icon: "🧑‍💻",
    title: "Вступить в команду NovaBoost",
    desc: "Для кураторов, менеджеров, разработчиков, дизайнеров и модераторов.",
    cta: "Заполнить анкету",
    href: "/submit?type=team",
  },
  {
    badge: "Участник",
    icon: "📂",
    title: "Уже являюсь участником",
    desc: "Документы, оферта и материалы для действующих участников экосистемы.",
    cta: "Заполнить заявку",
    href: "/submit?type=participant",
  },
];

export function JoinSection() {
  const ref = useScrollAnimation();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="join" className="relative py-32">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[500px] rounded-full bg-primary/10 blur-[150px]" />
      </div>
      <div ref={ref} className="section-fade-in relative mx-auto max-w-7xl px-6">
        <div className="text-center">
          <div className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">Присоединиться</div>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            Выберите свой <span className="text-gradient">путь</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Три отдельных сценария — выберите тот, который подходит именно вам
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {scenarios.map((s, i) => (
            <div key={i} className="glass rounded-3xl p-1 hover-lift gradient-border flex">
              <div className="rounded-[calc(1.5rem-4px)] bg-surface p-8 flex flex-col w-full">
                <div className="mb-3 inline-block self-start rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {s.badge}
                </div>
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="text-xl font-bold text-foreground mb-3">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-8 flex-1">{s.desc}</p>
                {"action" in s ? (
                  <button
                    onClick={() => setModalOpen(true)}
                    className="btn-primary-glow rounded-2xl px-6 py-3 text-sm font-bold w-full"
                  >
                    {s.cta}
                  </button>
                ) : (
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost-glow rounded-2xl px-6 py-3 text-sm font-semibold text-center"
                  >
                    {s.cta}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <JoinModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}