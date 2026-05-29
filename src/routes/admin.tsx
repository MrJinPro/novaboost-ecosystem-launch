import { useEffect, useMemo, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { clearAllStoredData, loadSubmissions, loadVisits } from "@/lib/storage";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Админ-панель — NovaBoost" },
      { name: "description", content: "Админ-панель NovaBoost для просмотра заявок и статистики" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [submissions, setSubmissions] = useState(loadSubmissions());
  const [visits, setVisits] = useState(loadVisits());
  const [serverLoaded, setServerLoaded] = useState(false);
  const [adminEmail, setAdminEmail] = useState('admin@novaboost.cloud');
  const [adminPassword, setAdminPassword] = useState('');
  const [authToken, setAuthToken] = useState('');
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    setSubmissions(loadSubmissions());
    setVisits(loadVisits());
  }, []);

  const handleLogin = () => {
    if (!adminEmail || !adminPassword) {
      setServerError('Введите email и пароль администратора');
      return;
    }
    setAuthToken(btoa(`${adminEmail}:${adminPassword}`));
    setServerError(null);
  };

  const loadFromServer = async () => {
    if (!authToken) {
      setServerError('Сначала нажмите "Войти" для сохранения данных администратора.');
      return;
    }

    try {
      const headers = { Authorization: 'Basic ' + authToken };
      const sResp = await fetch('/api/submissions', { headers });
      if (!sResp.ok) {
        throw new Error('Не удалось получить заявки');
      }
      const data = await sResp.json();
      setSubmissions(data.submissions || []);

      const vResp = await fetch('/api/visits', { headers });
      if (!vResp.ok) {
        throw new Error('Не удалось получить просмотры');
      }
      const vdata = await vResp.json();
      setVisits(vdata.visits || []);

      setServerLoaded(true);
      setServerError(null);
    } catch (err) {
      console.error(err);
      setServerError('Серверные данные не загружены. Проверьте логин и пароль.');
    }
  };

  const counts = useMemo(() => {
    return submissions.reduce(
      (acc, item) => {
        acc.total += 1;
        acc[item.type] += 1;
        return acc;
      },
      { total: 0, streamer: 0, team: 0, participant: 0 }
    );
  }, [submissions]);

  const visitCounts = useMemo(
    () => ({
      total: visits.length,
      last24h: visits.filter((visit) => {
        const date = new Date(visit.createdAt);
        return Date.now() - date.getTime() < 1000 * 60 * 60 * 24;
      }).length,
    }),
    [visits]
  );

  const clearData = () => {
    clearAllStoredData();
    setSubmissions([]);
    setVisits([]);
  };

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="mx-auto max-w-6xl space-y-8 px-4">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-[2rem] border border-border bg-surface p-8 shadow-xl">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Админ-панель</h1>
            <p className="mt-2 text-sm text-muted-foreground">Локальная панель для просмотра заявок и статистики сайта.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-3xl border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground hover:border-primary"
            >
              На главную
            </Link>
            <button
              onClick={loadFromServer}
              className="inline-flex items-center justify-center rounded-3xl border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground hover:border-primary"
            >
              Загрузить с сервера
            </button>
            <button
              onClick={clearData}
              className="inline-flex items-center justify-center rounded-3xl bg-destructive px-5 py-3 text-sm font-semibold text-destructive-foreground hover:bg-destructive/90"
            >
              Очистить данные
            </button>
          </div>
        </div>

        <div className="rounded-[2rem] border border-border bg-surface p-6 shadow-sm">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-foreground">Серверная авторизация</h2>
            <p className="text-sm text-muted-foreground">Введите учетные данные администратора для загрузки данных из сервера.</p>
          </div>
          <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm text-foreground">
                <span>Email администратора</span>
                <input
                  type="email"
                  value={adminEmail}
                  onChange={(event) => setAdminEmail(event.target.value)}
                  className="w-full rounded-3xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
                />
              </label>
              <label className="space-y-2 text-sm text-foreground">
                <span>Пароль</span>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(event) => setAdminPassword(event.target.value)}
                  className="w-full rounded-3xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
                />
              </label>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleLogin}
                className="inline-flex items-center justify-center rounded-3xl border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground hover:border-primary"
              >
                Войти
              </button>
              <button
                onClick={loadFromServer}
                className="inline-flex items-center justify-center rounded-3xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Загрузить с сервера
              </button>
            </div>
          </div>
          {serverError ? <p className="mt-4 text-sm text-destructive">{serverError}</p> : null}
          {serverLoaded ? <p className="mt-4 text-sm text-success-foreground">Серверные данные загружены.</p> : null}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-[2rem] border border-border bg-surface p-6">
            <p className="text-sm text-muted-foreground">Всего заявок</p>
            <p className="mt-4 text-4xl font-bold text-foreground">{counts.total}</p>
          </div>
          <div className="rounded-[2rem] border border-border bg-surface p-6">
            <p className="text-sm text-muted-foreground">Просмотров</p>
            <p className="mt-4 text-4xl font-bold text-foreground">{visitCounts.total}</p>
            <p className="mt-2 text-sm text-muted-foreground">за 24 часа: {visitCounts.last24h}</p>
          </div>
          <div className="rounded-[2rem] border border-border bg-surface p-6">
            <p className="text-sm text-muted-foreground">Заявки по типам</p>
            <div className="mt-4 space-y-2 text-foreground">
              <p>Стример: {counts.streamer}</p>
              <p>Команда: {counts.team}</p>
              <p>Участник: {counts.participant}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
          <section className="rounded-[2rem] border border-border bg-surface p-6">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Заявки</h2>
                <p className="text-sm text-muted-foreground">Первые 20 последних заявок.</p>
              </div>
            </div>
            {submissions.length === 0 ? (
              <p className="text-sm text-muted-foreground">Заявок пока нет.</p>
            ) : (
              <div className="space-y-4">
                {submissions.slice(0, 20).map((item) => (
                  <div key={item.id} className="rounded-3xl border border-border bg-background p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-foreground">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.type}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">{new Date(item.createdAt).toLocaleString()}</p>
                    </div>
                    <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                      {item.tiktokUsername ? <p>TikTok: {item.tiktokUsername}</p> : null}
                      {item.discordUsername ? <p>Discord: {item.discordUsername}</p> : null}
                      {item.telegramUsername ? <p>Telegram: {item.telegramUsername}</p> : null}
                      <p>Email: {item.email}</p>
                      {item.phone ? <p>Телефон: {item.phone}</p> : null}
                      <p>Источник: {item.referrer || "direct"}</p>
                      <p className="truncate">Страница: {item.pageUrl}</p>
                      {item.message && <p>Комментарий: {item.message}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="rounded-[2rem] border border-border bg-surface p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-foreground">Посещения</h2>
              <p className="text-sm text-muted-foreground">Последние 20 просмотров.</p>
            </div>
            {visits.length === 0 ? (
              <p className="text-sm text-muted-foreground">Просмотров пока нет.</p>
            ) : (
              <div className="space-y-4">
                {visits.slice(0, 20).map((visit) => (
                  <div key={visit.id} className="rounded-3xl border border-border bg-background p-4 text-sm text-muted-foreground">
                    <p className="font-semibold text-foreground">{visit.path}</p>
                    <p>Время: {new Date(visit.createdAt).toLocaleString()}</p>
                    <p>Источник: {visit.referrer || "direct"}</p>
                    <p>Язык: {visit.language}</p>
                    <p className="truncate">UA: {visit.userAgent}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        <div className="rounded-[2rem] border border-border bg-surface p-6 text-sm text-muted-foreground">
          <p className="font-semibold text-foreground">Ограничение</p>
          <p className="mt-2">Сейчас данные сохраняются локально в браузере. Для хранения IP и защиты админки потребуется сервер и база данных на VPS.</p>
        </div>
      </div>
    </div>
  );
}
