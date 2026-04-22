import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const myths = [
  { myth: "Агентства забирают деньги", truth: "Прозрачные условия" },
  { myth: "Агентства не помогают", truth: "Поддержка и развитие" },
  { myth: "Агентства не выпускают", truth: "Выход в 1 клик" },
  { myth: "Агентства забывают про стримеров", truth: "Реальное участие в росте" },
];

export function MythsSection() {
  const ref = useScrollAnimation();

  return (
    <section className="relative py-32">
      <div className="absolute right-0 top-1/2 h-[300px] w-[300px] rounded-full bg-destructive/5 blur-[100px]" />
      <div ref={ref} className="section-fade-in mx-auto max-w-6xl px-6">
        <div className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">Разрушаем мифы</div>
        <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
          Проблема рынка — <span className="text-gradient">наше решение</span>
        </h2>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <h3 className="mb-6 text-xl font-bold text-destructive/80">❌ Мифы об агентствах</h3>
            {myths.map((m, i) => (
              <div key={i} className="flex items-center gap-4 rounded-xl bg-destructive/5 px-6 py-4 border border-destructive/10">
                <span className="text-lg text-destructive/60">✕</span>
                <span className="text-muted-foreground">{m.myth}</span>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="mb-6 text-xl font-bold text-primary">✓ Как у нас</h3>
            {myths.map((m, i) => (
              <div key={i} className="flex items-center gap-4 rounded-xl glass px-6 py-4 gradient-border">
                <span className="text-lg text-primary">✓</span>
                <span className="text-foreground">{m.truth}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}