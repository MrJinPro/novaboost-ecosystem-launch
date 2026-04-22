import { Link } from "@tanstack/react-router";
import logoImg from "@/assets/novaboost-logo.png";

export function FooterSection() {
  return (
    <footer className="border-t border-border py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-3">
              <img src={logoImg} alt="NovaBoost" className="h-8 w-8 object-contain" />
              <span className="text-lg font-bold text-foreground">
                Nova<span className="text-gradient">Boost</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs text-center md:text-left">
              Экосистема роста для TikTok LIVE стримеров нового поколения.
            </p>
          </div>

          <div className="flex flex-wrap gap-12 text-sm">
            <div>
              <h4 className="font-semibold text-foreground mb-3">Продукты</h4>
              <div className="space-y-2 text-muted-foreground">
                <div>Academy</div>
                <div>Mobile</div>
                <div>Desktop</div>
                <div>Tools</div>
                <div>Live</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Контакты</h4>
              <div className="space-y-2 text-muted-foreground">
                <div><a href="https://t.me/novaboost_live" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Telegram</a></div>
                <div><a href="mailto:contact@novaboost.cloud" className="hover:text-foreground transition-colors">contact@novaboost.cloud</a></div>
                <div className="space-y-1">
                  <div>TikTok:</div>
                  <div><a href="https://tiktok.com/@novaboost.app" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">@novaboost.app</a></div>
                  <div><a href="https://tiktok.com/@novaboost.agency" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">@novaboost.agency</a></div>
                  <div><a href="https://tiktok.com/@novaboost.live" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">@novaboost.live</a></div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Документы</h4>
              <div className="space-y-2 text-muted-foreground">
                <div><Link to="/privacy" className="hover:text-foreground transition-colors">Политика конфиденциальности</Link></div>
                <div><Link to="/terms" className="hover:text-foreground transition-colors">Условия использования</Link></div>
                <div><Link to="/offer" className="hover:text-foreground transition-colors">Договор оферты</Link></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} NovaBoost. Все права защищены.</p>
          <p className="mt-2">Разработано и поддерживается разработчиками команды NovaBoost</p>
        </div>
      </div>
    </footer>
  );
}