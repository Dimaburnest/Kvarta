import { brand } from "@/lib/content";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="sheet site-header__inner">
        <a href="#top" className="stamp" style={{ textDecoration: "none" }}>
          {brand.name}
        </a>
        <span className="site-header__city">{brand.city}</span>
        <a href="#zayavka" className="site-header__link">
          Заявка
        </a>
      </div>
    </header>
  );
}
