import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const stats = [
  {
    label: "Рост аудитории",
    value: "+68%",
    note: "средний показатель активных авторов",
  },
  {
    label: "Рост дохода стримеров",
    value: "+42%",
    note: "после подключения инструментов",
  },
  {
    label: "Активных стримеров",
    value: "100+",
    note: "участвуют в экосистеме",
  },
  {
    label: "Проведённых эфиров",
    value: "5 000+",
    note: "за всё время работы",
  },
  {
    label: "Суммарных просмотров",
    value: "2,8M+",
    note: "по всем участникам",
  },
];

export function ResultsSection() {
  const ref = useScrollAnimation();
  return (
    <section id="results" className="relative py-32">
      <div className="absolute right-1/3 top-1/3 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[150px]" />
      <div ref={ref} className="section-fade-in mx-auto max-w-7xl px-6">
        <div className="text-center">
          <div className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">Результаты</div>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            Результаты наших <span className="text-gradient">участников</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Метрики экосистемы — обновляются по мере роста сообщества
          </p>
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {stats.map((s, i) => (
            <div key={i} className="glass rounded-3xl p-6 hover-lift gradient-border text-center">
              <div className="text-4xl font-extrabold text-gradient mb-2">{s.value}</div>
              <div className="text-sm font-semibold text-foreground mb-1">{s.label}</div>
              <div className="text-xs text-muted-foreground italic">{s.note}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}