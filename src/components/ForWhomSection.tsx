import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const audiences = [
  { icon: "🌱", title: "Начинающим стримерам", desc: "Получи базу, обучение и куратора с первого дня." },
  { icon: "🚀", title: "Опытным стримерам", desc: "Расти быстрее с аналитикой, инструментами и партнёрством." },
  { icon: "🎨", title: "Контент-креаторам", desc: "Развивай TikTok-канал и монетизируй контент в рамках экосистемы." },
  { icon: "🎙️", title: "Ведущим прямых эфиров", desc: "Профессиональные виджеты, оверлеи и озвучка для LIVE-эфиров." },
  { icon: "🧭", title: "Будущим кураторам", desc: "Стань частью команды кураторов и развивай стримеров вместе с нами." },
  { icon: "💼", title: "Сотрудникам команды", desc: "Разработчики, дизайнеры, менеджеры — в NovaBoost всегда есть место." },
];

export function ForWhomSection() {
  const ref = useScrollAnimation();
  return (
    <section id="for-whom" className="relative py-32">
      <div className="absolute left-1/4 top-0 h-[400px] w-[400px] rounded-full bg-accent/5 blur-[150px]" />
      <div ref={ref} className="section-fade-in mx-auto max-w-7xl px-6">
        <div className="text-center">
          <div className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">Аудитория</div>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            Кому подходит <span className="text-gradient">NovaBoost</span>
          </h2>
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((a, i) => (
            <div key={i} className="glass rounded-3xl p-8 hover-lift gradient-border text-center">
              <div className="text-4xl mb-4">{a.icon}</div>
              <h3 className="text-lg font-bold text-foreground mb-2">{a.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}