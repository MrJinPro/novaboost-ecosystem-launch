import { Link } from "@tanstack/react-router";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const docs = [
  { title: "Публичная оферта", desc: "Полный текст договора-оферты со стримерами.", to: "/offer" },
  { title: "Политика конфиденциальности", desc: "Как мы обрабатываем и защищаем данные.", to: "/privacy" },
  { title: "Пользовательское соглашение", desc: "Правила использования сервисов NovaBoost.", to: "/terms" },
  { title: "Правила участия", desc: "Внутренние правила экосистемы и сообщества.", to: "/rules" },
];

export function LegalSection() {
  const ref = useScrollAnimation();
  return (
    <section id="legal" className="relative py-32">
      <div ref={ref} className="section-fade-in mx-auto max-w-6xl px-6">
        <div className="text-center">
          <div className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">Документы</div>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            Юридическая <span className="text-gradient">прозрачность</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Мы придерживаемся открытых условий сотрудничества и предоставляем полный доступ к юридической документации.
          </p>
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {docs.map((d) => (
            <Link
              key={d.to}
              to={d.to}
              target="_blank"
              className="glass rounded-3xl p-8 hover-lift gradient-border group flex items-center justify-between gap-4"
            >
              <div>
                <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{d.title}</h3>
                <p className="text-sm text-muted-foreground">{d.desc}</p>
              </div>
              <div className="text-2xl text-primary opacity-60 group-hover:opacity-100 transition-opacity">→</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}