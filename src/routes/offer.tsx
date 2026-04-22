import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute('/offer')({
  head: () => ({
    meta: [
      { title: "Договор оферты — NovaBoost" },
      { name: "description", content: "Публичный договор оферты NovaBoost" },
    ],
  }),
  component: OfferPage,
});

function OfferPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 py-24">
        <Link to="/" className="text-sm text-primary hover:underline mb-8 inline-block">← Назад на главную</Link>
        <h1 className="text-3xl font-bold text-foreground mb-8">Публичный договор оферты</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground text-sm leading-relaxed">
          <p><strong className="text-foreground">Дата вступления в силу:</strong> {new Date().toLocaleDateString("ru-RU")}</p>

          <h2 className="text-xl font-semibold text-foreground mt-8">1. Общие положения</h2>
          <p>1.1. Настоящий документ является официальным предложением (публичной офертой) команды NovaBoost (далее — «Исполнитель») заключить договор на оказание услуг на условиях, изложенных ниже.</p>
          <p>1.2. Акцептом (принятием) настоящей оферты является подача заявки через форму на сайте novaboost.cloud и/или начало использования сервисов NovaBoost.</p>

          <h2 className="text-xl font-semibold text-foreground mt-8">2. Предмет договора</h2>
          <p>2.1. Исполнитель предоставляет Заказчику доступ к экосистеме сервисов NovaBoost, включая, но не ограничиваясь: обучающие программы (NovaBoost Academy), программное обеспечение (NovaBoost Tools, Desktop, Mobile), аналитические инструменты и поддержку стриминговой деятельности на платформе TikTok LIVE.</p>

          <h2 className="text-xl font-semibold text-foreground mt-8">3. Права и обязанности сторон</h2>
          <p>3.1. Исполнитель обязуется: предоставить доступ к заявленным сервисам, обеспечить техническую поддержку, соблюдать конфиденциальность данных Заказчика.</p>
          <p>3.2. Заказчик обязуется: предоставить достоверные данные при регистрации, соблюдать правила платформы TikTok и условия использования NovaBoost, не передавать доступ третьим лицам.</p>

          <h2 className="text-xl font-semibold text-foreground mt-8">4. Условия сотрудничества</h2>
          <p>4.1. Условия распределения дохода, комиссии и иные финансовые аспекты оговариваются индивидуально и фиксируются в дополнительном соглашении.</p>
          <p>4.2. Заказчик имеет право прекратить сотрудничество в любой момент, уведомив Исполнителя не менее чем за 7 (семь) календарных дней.</p>

          <h2 className="text-xl font-semibold text-foreground mt-8">5. Ответственность сторон</h2>
          <p>5.1. Исполнитель не несёт ответственности за результаты стриминговой деятельности Заказчика, так как они зависят от множества внешних факторов.</p>
          <p>5.2. Стороны освобождаются от ответственности в случае форс-мажорных обстоятельств.</p>

          <h2 className="text-xl font-semibold text-foreground mt-8">6. Срок действия</h2>
          <p>6.1. Настоящий договор вступает в силу с момента акцепта и действует до момента его расторжения одной из сторон.</p>

          <h2 className="text-xl font-semibold text-foreground mt-8">7. Прочие условия</h2>
          <p>7.1. Все споры разрешаются путём переговоров. При невозможности достижения согласия — в соответствии с действующим законодательством.</p>
          <p>7.2. Исполнитель оставляет за собой право вносить изменения в настоящий договор с уведомлением Заказчика.</p>

          <h2 className="text-xl font-semibold text-foreground mt-8">8. Контакты</h2>
          <p>Email: <a href="mailto:contact@novaboost.cloud" className="text-primary hover:underline">contact@novaboost.cloud</a></p>
          <p>Telegram: <a href="https://t.me/novaboost_live" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@novaboost_live</a></p>

          <div className="mt-12 p-6 rounded-2xl bg-muted/20 border border-border">
            <p className="text-xs text-muted-foreground italic">* Данный документ является предварительной версией публичной оферты. Окончательная версия будет опубликована после юридической проверки и регистрации.</p>
          </div>
        </div>
      </div>
    </div>
  );
}