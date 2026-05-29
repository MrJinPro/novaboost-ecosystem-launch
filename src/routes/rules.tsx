import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute('/rules')({
  head: () => ({
    meta: [
      { title: "Правила участия — NovaBoost" },
      { name: "description", content: "Внутренние правила участия в экосистеме NovaBoost" },
    ],
  }),
  component: RulesPage,
});

function RulesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 py-24">
        <Link to="/" className="text-sm text-primary hover:underline mb-8 inline-block">← Назад на главную</Link>
        <h1 className="text-3xl font-bold text-foreground mb-8">Правила участия</h1>
        <div className="space-y-6 text-muted-foreground text-sm leading-relaxed">
          <p><strong className="text-foreground">Дата вступления в силу:</strong> 29.05.2026</p>

          <h2 className="text-xl font-semibold text-foreground mt-8">1. Общие принципы</h2>
          <p>Участие в экосистеме NovaBoost строится на принципах прозрачности, добровольности, уважения к команде и сообществу, а также соблюдения правил платформы TikTok.</p>

          <h2 className="text-xl font-semibold text-foreground mt-8">2. Что запрещено</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Использование ботов и накрутки зрителей или подарков</li>
            <li>Фальшивые аккаунты и покупка активности</li>
            <li>Мошенничество и обход ограничений TikTok</li>
            <li>Передача аккаунта третьим лицам без уведомления</li>
            <li>Распространение внутренних материалов и доступов NovaBoost</li>
            <li>Токсичное поведение по отношению к команде и другим участникам</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground mt-8">3. Что мы ценим</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Регулярность и качество эфиров</li>
            <li>Уважительное общение с аудиторией и командой</li>
            <li>Готовность учиться и развиваться в Academy</li>
            <li>Обратную связь по сервисам и инструментам</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground mt-8">4. Последствия нарушений</h2>
          <p>При выявлении нарушений NovaBoost вправе ограничить доступ к сервисам, приостановить выплаты, ограничить функционал или прекратить сотрудничество в соответствии с условиями Публичной оферты.</p>

          <h2 className="text-xl font-semibold text-foreground mt-8">5. Контакты</h2>
          <p>По вопросам правил участия: <a href="mailto:contact@novaboost.cloud" className="text-primary hover:underline">contact@novaboost.cloud</a></p>
        </div>
      </div>
    </div>
  );
}