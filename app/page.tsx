import Image from "next/image";
import { Suspense } from "react";
import { LeadFormGate } from "@/components/LeadFormGate";
import { SiteHeader } from "@/components/SiteHeader";
import {
  brand,
  delivery,
  footer,
  formatPrice,
  hero,
  photos,
  products,
  subscription,
  subscriptionParagraph,
  week,
} from "@/lib/content";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="top" className="sheet site-main">
        <section className="site-section" aria-labelledby="hero-title">
          <h1 id="hero-title" className="hero-title">
            {hero.title}
          </h1>
          <p style={{ fontSize: "1.15rem", margin: "0 0 0.75rem" }}>
            {hero.lead}
          </p>
          <p style={{ margin: 0 }}>{hero.about}</p>
          <div className="cta-row">
            <a className="cta-primary" href="/?interest=subscription#zayavka">
              Подписка, {formatPrice(subscription.priceByn)}
            </a>
            <a href="/?interest=one_time#zayavka">Разовый заказ</a>
          </div>
          <figure className="photo-block">
            <Image
              src={photos.beans.src}
              alt={photos.beans.alt}
              width={photos.beans.width}
              height={photos.beans.height}
              priority
              sizes="(max-width: 40rem) 100vw, 40rem"
            />
          </figure>
        </section>

        <section className="site-section" aria-labelledby="week-title">
          <h2 id="week-title" className="section-title">
            Неделя
          </h2>
          <ul className="week-list">
            <li>
              <strong>{week.thursday.day}</strong>
              <span>{week.thursday.text}</span>
            </li>
            <li>
              <strong>{week.friday.day}</strong>
              <span>{week.friday.text}</span>
            </li>
          </ul>
        </section>

        <section className="site-section" aria-labelledby="assortment-title">
          <h2 id="assortment-title" className="section-title">
            Ассортимент
          </h2>
          <ul className="assortment">
            {products.map((product) => (
              <li key={product.id}>
                <div>
                  <strong>{product.name}</strong>
                  <p className="assortment__meta">
                    {product.notes}. {product.amount}
                  </p>
                </div>
                <span className="price">{formatPrice(product.priceByn)}</span>
              </li>
            ))}
          </ul>
          <figure className="photo-block">
            <Image
              src={photos.packaging.src}
              alt={photos.packaging.alt}
              width={photos.packaging.width}
              height={photos.packaging.height}
              sizes="(max-width: 40rem) 100vw, 40rem"
            />
          </figure>
        </section>

        <section className="site-section" aria-labelledby="subscription-title">
          <h2 id="subscription-title" className="section-title">
            Подписка
          </h2>
          <p style={{ margin: 0 }}>{subscriptionParagraph()}</p>
        </section>

        <section className="site-section" aria-labelledby="delivery-title">
          <h2 id="delivery-title" className="section-title">
            Доставка и самовывоз
          </h2>
          <ul className="delivery-list">
            <li>
              <strong>Адрес</strong>
              <span>{delivery.address}</span>
            </li>
            <li>
              <strong>Часы</strong>
              <span>
                {delivery.hoursWeekday}, {delivery.hoursWeekend}
              </span>
            </li>
            <li>
              <strong>Доставка</strong>
              <span>
                {delivery.fridayNote} Бесплатно от{" "}
                {formatPrice(delivery.freeFromByn)}.
              </span>
            </li>
          </ul>
          <figure className="photo-block">
            <Image
              src={photos.entrance.src}
              alt={photos.entrance.alt}
              width={photos.entrance.width}
              height={photos.entrance.height}
              sizes="(max-width: 40rem) 100vw, 40rem"
            />
          </figure>
        </section>

        <section
          id="zayavka"
          className="site-section"
          aria-labelledby="form-title"
        >
          <h2 id="form-title" className="section-title">
            Заявка
          </h2>
          <Suspense fallback={null}>
            <LeadFormGate />
          </Suspense>
        </section>
      </main>

      <footer className="site-footer">
        <div className="sheet">
          <p className="stamp" style={{ margin: "0 0 0.5rem" }}>
            {brand.name}
          </p>
          <p style={{ margin: "0 0 0.35rem" }}>
            {delivery.address}, {brand.city}
          </p>
          <p style={{ margin: "0 0 0.75rem" }}>
            {delivery.hoursWeekday}, {delivery.hoursWeekend}
          </p>
          <p style={{ margin: 0 }}>{footer.note}</p>
        </div>
      </footer>
    </>
  );
}
