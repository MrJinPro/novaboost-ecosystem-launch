import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "Забирает ли агентство процент?", a: "NovaBoost удерживает собственное вознаграждение за инфраструктуру, сопровождение, academy и техническую поддержку. Точные условия фиксируются индивидуально и описаны в публичной оферте." },
  { q: "Можно ли выйти из агентства?", a: "Да. Выход добровольный — вы можете прекратить сотрудничество в любой момент через внутренний функционал, поддержку или заявку на выход. Мы не удерживаем стримеров против их воли." },
  { q: "Есть ли штрафы?", a: "Штрафов за добровольный выход нет. Ограничения возможны только при нарушении правил TikTok, мошенничестве или накрутке — подробности в разделе о добросовестном использовании оферты." },
  { q: "Как происходит вступление?", a: "Подаёте заявку через форму на сайте → с вами связывается куратор → проходите короткое собеседование → подписываете публичную оферту → подключаетесь к экосистеме." },
  { q: "Кто может вступить?", a: "Начинающие и опытные стримеры, контент-креаторы, ведущие прямых эфиров, будущие кураторы и специалисты в команду (разработчики, дизайнеры, менеджеры, модераторы)." },
  { q: "Как работает поддержка?", a: "За каждым стримером может быть закреплён куратор. Также доступна техническая поддержка по сервисам и инструментам, обучение в Academy и сообщество участников." },
  { q: "Что даёт NovaBoost кроме агентства?", a: "Экосистему из пяти продуктов: Academy (обучение), Tools (виджеты, оверлеи, озвучка), Desktop и Mobile (инструменты для эфиров), Live (аналитика и рекомендации)." },
];

export function FAQSection() {
  const ref = useScrollAnimation();
  return (
    <section id="faq" className="relative py-32">
      <div ref={ref} className="section-fade-in mx-auto max-w-3xl px-6">
        <div className="text-center">
          <div className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">FAQ</div>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            Частые <span className="text-gradient">вопросы</span>
          </h2>
        </div>
        <Accordion type="single" collapsible className="mt-12 space-y-4">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="glass rounded-2xl px-6 border-none"
            >
              <AccordionTrigger className="text-left text-base font-semibold text-foreground hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}