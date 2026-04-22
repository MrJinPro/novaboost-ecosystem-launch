import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const team = [
  { role: "CEO & Founder", emoji: "👑", desc: "Стратегия и видение экосистемы" },
  { role: "Head of Streams", emoji: "🎙️", desc: "Координация стримерского направления" },
  { role: "Lead Developer", emoji: "💻", desc: "Разработка технологических продуктов" },
  { role: "Academy Director", emoji: "🎓", desc: "Образовательные программы и обучение" },
  { role: "Community Manager", emoji: "🤝", desc: "Работа с сообществом и поддержка" },
  { role: "Content Lead", emoji: "🎨", desc: "Контент-стратегия и визуальное оформление" },
];

export function TeamSection() {
  const ref = useScrollAnimation();

  return (
    <section id="team" className="relative py-32">
      <div className="absolute left-1/4 bottom-0 h-[300px] w-[300px] rounded-full bg-accent/5 blur-[100px]" />
      <div ref={ref} className="section-fade-in mx-auto max-w-6xl px-6">
        <div className="text-center">
          <div className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">Команда</div>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            Люди за <span className="text-gradient">NovaBoost</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Профессиональная команда, объединённая общей целью
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((t, i) => (
            <div key={i} className="glass rounded-2xl p-6 text-center hover-lift gradient-border group">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-surface-elevated text-4xl transition-transform duration-300 group-hover:scale-110">
                {t.emoji}
              </div>
              <h3 className="text-lg font-bold text-foreground">{t.role}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}