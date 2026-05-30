import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const reviews = [
  {
    name: "Мария.",
    role: "TikTok LIVE стример",
    text: "Честно, сначала думал, что это очередное агентство с обещаниями. Но после первой недели куратор помог настроить эфиры и объяснил, как работают подарки и рейтинг. Стримить стало намного проще.",
    avatar: "М",
  },
  {
    name: "Даниил.",
    role: "TikTok LIVE стример",
    text: "Мне понравилось, что можно быстро получить ответ на любой вопрос. Раньше искал информацию по чатам и роликам на YouTube, сейчас просто спрашиваю у куратора. Экономит кучу времени.",
    avatar: "Д",
  },
  {
    name: "Сергей.",
    role: "Контент-креатор",
    text: "Зашёл ради инструментов для эфиров. Больше всего понравились оверлеи и озвучка событий. Зрители начали чаще реагировать в чате, а эфиры стали выглядеть гораздо профессиональнее.",
    avatar: "С",
  },
];

export function TestimonialsSection() {
  const ref = useScrollAnimation();
  return (
    <section id="testimonials" className="relative py-32">
      <div ref={ref} className="section-fade-in mx-auto max-w-7xl px-6">
        <div className="text-center">
          <div className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">Отзывы</div>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            Что говорят <span className="text-gradient">участники</span>
          </h2>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {reviews.map((r, i) => (
            <div key={i} className="glass rounded-3xl p-8 hover-lift gradient-border">
              <div className="text-3xl text-primary/40 mb-4 font-serif leading-none">"</div>
              <p className="text-sm text-foreground/90 leading-relaxed mb-6">{r.text}</p>
              <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-bold text-background">
                  {r.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}