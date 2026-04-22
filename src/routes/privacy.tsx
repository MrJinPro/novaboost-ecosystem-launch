import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Политика конфиденциальности — NovaBoost" },
      { name: "description", content: "Политика конфиденциальности NovaBoost" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 py-24">
        <Link to="/" className="text-sm text-primary hover:underline mb-8 inline-block">← Назад на главную</Link>
        <h1 className="text-3xl font-bold text-foreground mb-8">Политика конфиденциальности</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground text-sm leading-relaxed">
          <p><strong className="text-foreground">Дата вступления в силу:</strong> {new Date().toLocaleDateString("ru-RU")}</p>
          <h2 className="text-xl font-semibold text-foreground mt-8">1. Общие положения</h2>
          <p>Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей экосистемы NovaBoost (далее — «Платформа»).</p>
          <h2 className="text-xl font-semibold text-foreground mt-8">2. Какие данные мы собираем</h2>
          <p>Мы можем собирать следующие данные: имя, адрес электронной почты, контактные данные в мессенджерах (Telegram), информацию о роли и опыте, а также техническую информацию (IP-адрес, тип браузера, cookies).</p>
          <h2 className="text-xl font-semibold text-foreground mt-8">3. Цели обработки данных</h2>
          <p>Данные используются для: обработки заявок на вступление, коммуникации с пользователями, улучшения качества услуг, аналитики и статистики.</p>
          <h2 className="text-xl font-semibold text-foreground mt-8">4. Защита данных</h2>
          <p>Мы принимаем все необходимые организационные и технические меры для защиты персональных данных от несанкционированного доступа, изменения, раскрытия или уничтожения.</p>
          <h2 className="text-xl font-semibold text-foreground mt-8">5. Передача данных третьим лицам</h2>
          <p>Мы не передаём персональные данные третьим лицам без согласия пользователя, за исключением случаев, предусмотренных законодательством.</p>
          <h2 className="text-xl font-semibold text-foreground mt-8">6. Контакты</h2>
          <p>По всем вопросам, связанным с обработкой персональных данных, вы можете обратиться по адресу: <a href="mailto:contact@novaboost.cloud" className="text-primary hover:underline">contact@novaboost.cloud</a></p>
        </div>
      </div>
    </div>
  );
}