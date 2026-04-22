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

          <div className="flex gap-12 text-sm">
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
                <div>Telegram</div>
                <div>TikTok</div>
                <div>Email</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} NovaBoost. Все права защищены.
        </div>
      </div>
    </footer>
  );
}