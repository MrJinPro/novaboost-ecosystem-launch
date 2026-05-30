import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "Нужно ли платить за вступление?",
    a: "Нет. Подача заявки и вступление в экосистему бесплатны. После одобрения вы получаете доступ к обучению, инструментам и поддержке сообщества.",
  },
  {
    q: "Можно ли уйти в любой момент?",
    a: "Да. Участие полностью добровольное. Если решите продолжить путь самостоятельно или перейти в другое агентство, вы можете прекратить сотрудничество без сложных процедур.",
  },
  {
    q: "Есть ли штрафы или скрытые условия?",
    a: "Нет. Мы не используем скрытые платежи или штрафы за участие. От участников ожидается только соблюдение правил платформы TikTok и внутренних правил сообщества.",
  },
  {
    q: "Как проходит вступление?",
    a: "Оставляете заявку на сайте, после чего с вами связывается куратор. Мы знакомимся, отвечаем на вопросы и помогаем пройти процесс подключения.",
  },
  {
    q: "Кто может присоединиться?",
    a: "Начинающие и опытные TikTok LIVE авторы, стримеры, контент-креаторы и все, кто хочет развиваться в сфере прямых эфиров.",
  },
  {
    q: "Что я получу после вступления?",
    a: "Доступ к обучающим материалам, поддержке кураторов, инструментам для трансляций, полезным сервисам и закрытому сообществу авторов.",
  },
  {
    q: "Чем NovaBoost отличается от обычного агентства?",
    a: "Мы делаем упор не только на сопровождение авторов, но и на создание собственной экосистемы: обучение, инструменты для эфиров, аналитику, поддержку и развитие сообщества.",
  },
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