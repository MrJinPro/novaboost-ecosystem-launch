import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const benefits = [
  { icon: "🎓", title: "Персональное обучение", desc: "Индивидуальная программа развития под каждого стримера" },
  { icon: "👥", title: "Команда поддержки", desc: "Кураторы и менторы доступны 24/7" },
  { icon: "📈", title: "Стратегия роста", desc: "Аналитика и план развития для максимального охвата" },
  { icon: "🎬", title: "Помощь с контентом", desc: "Идеи, шаблоны и помощь с визуальным оформлением" },
  { icon: "🔧", title: "Аналитика и инструменты", desc: "Собственный софт для отслеживания прогресса" },
  { icon: "🏆", title: "Мотивационные системы", desc: "Бонусы, челленджи и система достижений" },
];

export function BenefitsSection() {
  const ref = useScrollAnimation();

  return (
    <section id="benefits" className="relative py-32">
      <div className="absolute left-0 top-1/3 h-[350px] w-[350px] rounded-full bg-primary/5 blur-[120px]" />
      <div ref={ref} className="section-fade-in mx-auto max-w-6xl px-6">
        <div className="text-center">
          <div className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">Для стримеров</div>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            Что получает <span className="text-gradient">стример</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Полный набор инструментов и поддержки для вашего роста на TikTok LIVE
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="glass rounded-2xl p-8 hover-lift gradient-border group"
            >
              <div className="mb-4 text-4xl transition-transform duration-300 group-hover:scale-110">{b.icon}</div>
              <h3 className="mb-2 text-lg font-bold text-foreground">{b.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}