import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Условия использования — NovaBoost" },
      { name: "description", content: "Условия использования NovaBoost" },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 py-24">
        <Link to="/" className="text-sm text-primary hover:underline mb-8 inline-block">← Назад на главную</Link>
        <h1 className="text-3xl font-bold text-foreground mb-8">Условия использования</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground text-sm leading-relaxed">
          <p><strong className="text-foreground">Дата вступления в силу:</strong> {new Date().toLocaleDateString("ru-RU")}</p>
          <h2 className="text-xl font-semibold text-foreground mt-8">1. Общие положения</h2>
          <p>Настоящие Условия регулируют использование платформы NovaBoost и всех связанных с ней продуктов и сервисов.</p>
          <h2 className="text-xl font-semibold text-foreground mt-8">2. Описание услуг</h2>
          <p>NovaBoost предоставляет экосистему инструментов и сервисов для TikTok LIVE стримеров, включая обучение, аналитику, программное обеспечение и поддержку.</p>
          <h2 className="text-xl font-semibold text-foreground mt-8">3. Регистрация и аккаунт</h2>
          <p>Для доступа к ряду функций необходимо подать заявку и пройти процедуру одобрения. Вы обязуетесь предоставлять достоверную информацию.</p>
          <h2 className="text-xl font-semibold text-foreground mt-8">4. Права и обязанности</h2>
          <p>Пользователь обязуется не нарушать правила платформы TikTok, не использовать сервисы NovaBoost в незаконных целях и соблюдать этические нормы сообщества.</p>
          <h2 className="text-xl font-semibold text-foreground mt-8">5. Интеллектуальная собственность</h2>
          <p>Все материалы, программное обеспечение и контент NovaBoost являются интеллектуальной собственностью команды NovaBoost и защищены законодательством.</p>
          <h2 className="text-xl font-semibold text-foreground mt-8">6. Ограничение ответственности</h2>
          <p>NovaBoost не гарантирует конкретных финансовых результатов. Результаты зависят от усилий и вовлечённости каждого участника.</p>
          <h2 className="text-xl font-semibold text-foreground mt-8">7. Контакты</h2>
          <p>По вопросам условий использования: <a href="mailto:contact@novaboost.cloud" className="text-primary hover:underline">contact@novaboost.cloud</a></p>
        </div>
      </div>
    </div>
  );
}