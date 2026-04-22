import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const values = [
  { icon: "🔍", title: "Прозрачность", desc: "Открытые условия сотрудничества без скрытых платежей" },
  { icon: "🚀", title: "Экосистема", desc: "Не просто агентство — полный набор инструментов для роста" },
  { icon: "🤝", title: "Честность", desc: "Мы строим долгосрочные партнёрства, а не собираем стримеров" },
  { icon: "📊", title: "Технологии", desc: "Собственные инструменты аналитики и развития" },
];

export function AboutSection() {
  const ref = useScrollAnimation();

  return (
    <section id="about" className="relative py-32">
      <div className="absolute top-0 left-1/3 h-[400px] w-[400px] rounded-full bg-neon-blue/5 blur-[120px]" />
      <div ref={ref} className="section-fade-in mx-auto max-w-6xl px-6">
        <div className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">О нас</div>
        <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
          Мы строим <span className="text-gradient">будущее стриминга</span>
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          NovaBoost — это экосистема, созданная стримерами для стримеров. Мы объединяем технологии,
          обучение и поддержку в единую платформу роста на TikTok LIVE.
        </p>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <div
              key={i}
              className="glass rounded-2xl p-6 hover-lift gradient-border"
            >
              <div className="mb-4 text-3xl">{v.icon}</div>
              <h3 className="mb-2 text-lg font-bold text-foreground">{v.title}</h3>
              <p className="text-sm text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}