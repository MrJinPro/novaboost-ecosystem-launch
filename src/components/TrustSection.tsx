import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const items = [
  { icon: "🤝", title: "Официальное сотрудничество с TikTok LIVE", desc: "Прямая работа в рамках партнёрской программы платформы." },
  { icon: "🔍", title: "Прозрачные условия участия", desc: "Никаких скрытых пунктов — все условия публичны и доступны заранее." },
  { icon: "📄", title: "Публичная оферта и открытые документы", desc: "Полный пакет юридической документации в открытом доступе." },
  { icon: "🧩", title: "Собственная экосистема сервисов", desc: "Academy, Tools, Desktop, Mobile, Live — пять продуктов в одной среде." },
  { icon: "💬", title: "Поддержка стримеров и кураторов", desc: "Живое сопровождение на каждом этапе развития." },
  { icon: "⚡", title: "Технологические продукты для развития", desc: "Аналитика, оверлеи, виджеты, озвучка — собственная разработка." },
];

export function TrustSection() {
  const ref = useScrollAnimation();
  return (
    <section id="trust" className="relative py-32">
      <div ref={ref} className="section-fade-in mx-auto max-w-7xl px-6">
        <div className="text-center">
          <div className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">Доверие</div>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            Почему <span className="text-gradient">NovaBoost</span> заслуживает доверия
          </h2>
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <div key={i} className="glass rounded-3xl p-6 hover-lift gradient-border">
              <div className="text-3xl mb-4">{it.icon}</div>
              <h3 className="font-bold text-foreground mb-2">{it.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}