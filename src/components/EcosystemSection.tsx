import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import academyImg from "@/assets/novaboost-agency.png";
import mobileImg from "@/assets/novaboost-mobile.png";
import desktopImg from "@/assets/novaboost-desktop.png";
import toolsImg from "@/assets/novaboost-tools.png";
import liveImg from "@/assets/novaboost-live.png";

const products = [
  { img: academyImg, name: "NovaBoost Academy", desc: "Обучающая платформа для стримеров. Курсы, вебинары и персональные программы развития.", tag: "Обучение" },
  { img: mobileImg, name: "NovaBoost Mobile", desc: "Мобильное приложение для управления стримами и отслеживания статистики на ходу.", tag: "Мобайл" },
  { img: desktopImg, name: "NovaBoost Desktop", desc: "Десктоп-платформа с расширенными инструментами аналитики и управления.", tag: "Десктоп" },
  { img: toolsImg, name: "NovaBoost Tools", desc: "Эксклюзивный софт для стримеров агентства: оверлеи, виджеты, автоматизация.", tag: "Инструменты" },
  { img: liveImg, name: "NovaBoost Live", desc: "Платформа роста для TikTok LIVE. Аналитика в реальном времени и рекомендации.", tag: "LIVE" },
];

export function EcosystemSection() {
  const ref = useScrollAnimation();

  return (
    <section id="ecosystem" className="relative py-32">
      <div className="absolute right-1/4 top-0 h-[500px] w-[500px] rounded-full bg-neon/5 blur-[150px]" />
      <div ref={ref} className="section-fade-in mx-auto max-w-7xl px-6">
        <div className="text-center">
          <div className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">Экосистема</div>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            Экосистема <span className="text-gradient">NovaBoost</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Пять продуктов, объединённых одной целью — ваш рост
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <div
              key={i}
              className={`glass rounded-3xl p-1 hover-lift gradient-border group ${i === 4 ? "sm:col-span-2 lg:col-span-1" : ""}`}
            >
              <div className="rounded-[calc(1.5rem-4px)] bg-surface p-6">
                <div className="mb-6 flex items-center justify-center">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="h-28 w-28 object-contain transition-transform duration-500 group-hover:scale-110"
                    style={{ animation: `float ${3 + i * 0.5}s ease-in-out infinite` }}
                  />
                </div>
                <div className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {p.tag}
                </div>
                <h3 className="mb-2 text-xl font-bold text-foreground">{p.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}