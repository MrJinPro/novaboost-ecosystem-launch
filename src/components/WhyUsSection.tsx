import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const reasons = [
  { num: "01", title: "Честность", desc: "Никаких скрытых условий. Всё прозрачно от первого дня." },
  { num: "02", title: "Прозрачность", desc: "Открытая аналитика, понятные условия, честная коммуникация." },
  { num: "03", title: "Технологии", desc: "Собственная экосистема продуктов для роста стримеров." },
  { num: "04", title: "Обучение", desc: "NovaBoost Academy — полноценная система образования." },
  { num: "05", title: "Вовлечённость", desc: "Мы не оставляем стримеров наедине с проблемами." },
];

export function WhyUsSection() {
  const ref = useScrollAnimation();

  return (
    <section className="relative py-32">
      <div ref={ref} className="section-fade-in mx-auto max-w-5xl px-6">
        <div className="text-center">
          <div className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">Наши преимущества</div>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            Почему мы лучше <span className="text-gradient">95% агентств</span>
          </h2>
        </div>

        <div className="mt-16 space-y-6">
          {reasons.map((r, i) => (
            <div
              key={i}
              className="glass rounded-2xl p-6 flex items-start gap-6 hover-lift gradient-border group"
            >
              <span className="text-3xl font-black text-gradient opacity-50 group-hover:opacity-100 transition-opacity">{r.num}</span>
              <div>
                <h3 className="text-lg font-bold text-foreground">{r.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}