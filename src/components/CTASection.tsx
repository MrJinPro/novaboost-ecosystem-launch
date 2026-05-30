import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export function CTASection() {
  const ref = useScrollAnimation();

  return (
    <section className="relative py-32">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[500px] rounded-full bg-primary/10 blur-[150px]" />
      </div>
      <div ref={ref} className="section-fade-in relative mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-4xl font-extrabold tracking-tight md:text-6xl">
          Стань частью <span className="text-gradient">NovaBoost</span>
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-lg text-muted-foreground">
          Присоединяйся к экосистеме нового поколения. Стримеры, кураторы, разработчики — нам нужны
          именно вы.
        </p>
        <a
          href="#join"
          className="btn-primary-glow mt-10 inline-flex rounded-2xl px-10 py-5 text-lg font-bold"
        >
          Вступить в команду
        </a>
      </div>
    </section>
  );
}
