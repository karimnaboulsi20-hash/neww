/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';

const NAMES = [
  'Juan', 'María', 'Carlos', 'Ana', 'Luis', 'Sofía', 'Pedro', 'Laura',
  'Diego', 'Camila', 'Andrés', 'Valeria', 'Javier', 'Valentina', 'Mateo',
  'Martín', 'Lucía', 'Fernanda', 'Gabriel', 'Daniela'
];

const COUNTRIES = [
  'Argentina', 'México', 'España', 'Colombia', 'Chile', 'Perú',
  'Ecuador', 'Uruguay', 'Paraguay', 'Bolivia', 'Estados Unidos',
  'Guatemala', 'Costa Rica'
];

interface PopupData {
  name: string;
  location: string;
  timeAgo: number;
}

const FAQ_DATA = [
  {
    q: '¿Cómo recibo los videos?',
    a: 'Después de la compra, recibís un email con un PDF que tiene los links de descarga organizados por nicho (Google Drive). El acceso es instantáneo.'
  },
  {
    q: '¿Los videos tienen marca de agua?',
    a: 'No. Todos los videos vienen sin marca de agua, listos para usar.'
  },
  {
    q: '¿En qué formato están los videos?',
    a: 'Todos en MP4, en alta calidad, optimizados para formato vertical (Reels, TikTok, Shorts).'
  },
  {
    q: '¿Puedo usar los videos para mi negocio o marca?',
    a: 'Sí. Podés usar los videos en tus cuentas personales, en cuentas de tu marca, o para publicar contenido de clientes. Sin restricciones.'
  },
  {
    q: '¿Puedo usar los videos para cuentas de clientes?',
    a: 'Sí. Podés usarlos para tus propias cuentas, para clientes, para tu agencia — sin restricciones.'
  },
  {
    q: '¿Tiene garantía?',
    a: 'Sí. Tenés 7 días para probar el pack. Si no te gusta, te devolvemos el dinero sin preguntas.'
  },
  {
    q: '¿Funciona en mi país?',
    a: 'Sí. El pack es 100% digital. Funciona desde cualquier país del mundo. Solo necesitás internet para descargar.'
  }
];

export default function App() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const [popupData, setPopupData] = useState<PopupData>({
    name: 'Andrés',
    location: 'Chile',
    timeAgo: 12
  });
  const [currentDateFormatted, setCurrentDateFormatted] = useState<string>('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Dynamic formatted date in Spanish
  useEffect(() => {
    try {
      const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
      const today = new Date().toLocaleDateString('es-ES', options);
      setCurrentDateFormatted(today);
    } catch {
      setCurrentDateFormatted(new Date().toLocaleDateString());
    }
  }, []);

  // Ensure all videos play inline and autoplay with sound muted
  useEffect(() => {
    const videos = document.querySelectorAll('video');
    videos.forEach((video) => {
      video.muted = true;
      video.setAttribute('playsinline', '');
      video.play().catch(() => {
        // Autoplay policy fallback
      });
    });
  }, []);

  // Sales Popup cycle
  useEffect(() => {
    const showNewPopup = () => {
      const randomName = NAMES[Math.floor(Math.random() * NAMES.length)];
      const randomCountry = COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)];
      const randomTime = Math.floor(Math.random() * 59) + 1;

      setPopupData({
        name: randomName,
        location: randomCountry,
        timeAgo: randomTime
      });
      setPopupVisible(true);

      // Hide after 6 seconds
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = setTimeout(() => {
        setPopupVisible(false);
      }, 6000);
    };

    const scheduleNext = () => {
      const nextInterval = Math.floor(Math.random() * (35000 - 15000 + 1)) + 15000;
      timeoutRef.current = setTimeout(() => {
        showNewPopup();
        scheduleNext();
      }, nextInterval);
    };

    // Initial popup after 3 seconds
    const initialTimer = setTimeout(() => {
      showNewPopup();
      scheduleNext();
    }, 3000);

    return () => {
      clearTimeout(initialTimer);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div>
      {/* SEÇÃO 1 — HERO */}
      <section className="hero">
        <div className="container fade-in">
          <div className="pre-headline">🔥 +250.000 VIDEOS VIRALES — LISTOS PARA PUBLICAR</div>
          <h1>Más de 250.000 Videos Virales Sin Rostro — Listos Para Publicar en Tus Redes Hoy Mismo</h1>

          <div className="mockup mockup-carousel">
            <div className="carousel-track">
              {/* First Set */}
              <video src="videos/preview1.mp4" autoPlay muted loop playsInline></video>
              <video src="videos/preview2.mp4" autoPlay muted loop playsInline></video>
              <video src="videos/preview3.mp4" autoPlay muted loop playsInline></video>
              <video src="videos/preview4.mp4" autoPlay muted loop playsInline></video>
              {/* Second Set for infinite scroll */}
              <video src="videos/preview1.mp4" autoPlay muted loop playsInline></video>
              <video src="videos/preview2.mp4" autoPlay muted loop playsInline></video>
              <video src="videos/preview3.mp4" autoPlay muted loop playsInline></video>
              <video src="videos/preview4.mp4" autoPlay muted loop playsInline></video>
            </div>
          </div>

          <p className="subheadline">
            El pack más grande de videos virales organizados por nicho. Sin grabar. Sin editar.
            Sin mostrar tu cara. Solo descargá, publicá y crecé.
          </p>
        </div>
      </section>

      {/* SEÇÃO 2 — NÚMEROS IMPACTANTES */}
      <section className="bg-alt">
        <div className="container fade-in">
          <h2 className="text-center">Esto es lo que hay dentro del pack</h2>
          <div className="grid-4">
            <div className="number-card">
              <div className="number text-neon">250.000+</div>
              <h3>Videos Virales</h3>
              <p>
                Una biblioteca masiva de contenido que ya fue probado en redes sociales. Cada video está listo
                para descargar y publicar.
              </p>
            </div>
            <div className="number-card">
              <div className="number text-neon">50+</div>
              <h3>Nichos Diferentes</h3>
              <p>
                Desde lujo y motivación hasta fitness, viajes, autos, estética, naturaleza y más. Todo organizado
                por carpetas.
              </p>
            </div>
            <div className="number-card">
              <div className="number text-neon">Sin Rostro</div>
              <h3>100% Faceless</h3>
              <p>No necesitás mostrar tu cara. Perfecto para páginas temáticas, marcas o cuentas anónimas.</p>
            </div>
            <div className="number-card">
              <div className="number text-neon">HD Ready</div>
              <h3>Alta Calidad</h3>
              <p>
                Todos los videos están en alta definición, optimizados para formato vertical. Listos para
                descargar y publicar sin editar nada.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 3 — GALERIA DE PREVIEW */}
      <section>
        <div className="container fade-in">
          <h2 className="text-center">Mirá la calidad de los videos</h2>
          <div className="grid-3">
            <div className="preview-card">
              <video autoPlay muted loop playsInline src="videos/preview1.mp4"></video>
            </div>
            <div className="preview-card">
              <video autoPlay muted loop playsInline src="videos/preview2.mp4"></video>
            </div>
            <div className="preview-card">
              <video autoPlay muted loop playsInline src="videos/preview3.mp4"></video>
            </div>
            <div className="preview-card">
              <video autoPlay muted loop playsInline src="videos/preview4.mp4"></video>
            </div>
            <div className="preview-card">
              <video autoPlay muted loop playsInline src="videos/preview5.mp4"></video>
            </div>
            <div className="preview-card">
              <video autoPlay muted loop playsInline src="videos/preview6.mp4"></video>
            </div>
          </div>
          <div className="text-center" style={{ marginTop: '40px' }}>
            <a href="#checkout" className="btn btn-green">
              ACCEDER AHORA AL PACK
            </a>
          </div>
        </div>
      </section>

      {/* SEÇÃO 4 — PARA QUEM É */}
      <section className="bg-alt">
        <div className="container fade-in">
          <h2 className="text-center">¿Para quién es este pack?</h2>
          <div className="grid-3">
            <div className="card">
              <div className="icon">📱</div>
              <h3>Para Creadores de Contenido</h3>
              <p>
                Si manejás páginas en Instagram, TikTok o YouTube y necesitás contenido nuevo TODOS LOS DÍAS sin
                pasarte horas grabando y editando — este pack te da material para meses de publicaciones.
              </p>
            </div>
            <div className="card">
              <div className="icon">💼</div>
              <h3>Para Marcas y Negocios</h3>
              <p>
                Si tenés un negocio y necesitás presencia en redes pero no tenés tiempo ni equipo para crear
                contenido — este pack te resuelve meses de publicaciones en minutos.
              </p>
            </div>
            <div className="card">
              <div className="icon">🏢</div>
              <h3>Para Community Managers y Agencias</h3>
              <p>
                Si manejás redes sociales de clientes, este pack es tu biblioteca secreta. Contenido listo para
                publicar en cualquier nicho sin pagarle a nadie.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 6 — NICHOS */}
      <section>
        <div className="container fade-in">
          <h2 className="text-center">+50 nichos organizados por carpeta</h2>
          <div className="niche-grid">
            <div className="niche-card">
              <div className="niche-img-wrapper">
                <img src="imgs/nicho1.jpeg" alt="Autos de Lujo" />
                <div className="niche-overlay"></div>
                <h3 className="niche-title">AUTOS DE LUJO</h3>
              </div>
              <p className="niche-desc">
                Tomas de autos súper virales para empezar una cuenta en cualquier red social.
              </p>
            </div>
            <div className="niche-card">
              <div className="niche-img-wrapper">
                <img src="imgs/nicho2.jpeg" alt="Fitness" />
                <div className="niche-overlay"></div>
                <h3 className="niche-title">FITNESS</h3>
              </div>
              <p className="niche-desc">
                Videos de gym, entrenamiento y estilo de vida fitness listos para publicar.
              </p>
            </div>
            <div className="niche-card">
              <div className="niche-img-wrapper">
                <img src="imgs/nicho3.jpeg" alt="Motivación" />
                <div className="niche-overlay"></div>
                <h3 className="niche-title">MOTIVACIÓN</h3>
              </div>
              <p className="niche-desc">
                Clips motivacionales con frases y escenas que generan miles de compartidos.
              </p>
            </div>
            <div className="niche-card">
              <div className="niche-img-wrapper">
                <img src="imgs/nicho4.jpeg" alt="Películas y Series" />
                <div className="niche-overlay"></div>
                <h3 className="niche-title">PELÍCULAS Y SERIES</h3>
              </div>
              <p className="niche-desc">Uno de los mejores nichos para obtener resultados rápidos.</p>
            </div>
            <div className="niche-card">
              <div className="niche-img-wrapper">
                <img src="imgs/nicho5.jpeg" alt="Aesthetic & Lujo" />
                <div className="niche-overlay"></div>
                <h3 className="niche-title">AESTHETIC & LUJO</h3>
              </div>
              <p className="niche-desc">Contenido de lifestyle lujoso y estético que el algoritmo ama.</p>
            </div>
            <div className="niche-card">
              <div className="niche-img-wrapper">
                <img src="imgs/nicho6.jpeg" alt="Naturaleza" />
                <div className="niche-overlay"></div>
                <h3 className="niche-title">NATURALEZA</h3>
              </div>
              <p className="niche-desc">Escenas de naturaleza relajantes y visualmente impactantes.</p>
            </div>
          </div>
          <div className="niche-extra-block">
            <h3 className="niche-extra-title">
              <em>Y docenas de colecciones más...</em>
            </h3>
            <p className="niche-extra-desc">
              El pack completo incluye <strong className="text-neon">+250.000 Videos</strong> divididos en más de 50
              categorías para cubrir absolutamente cualquier nicho o estilo de contenido.
            </p>
          </div>
        </div>
      </section>

      {/* SEÇÃO 5 — BENEFÍCIOS */}
      <section className="bg-alt">
        <div className="container fade-in">
          <h2 className="text-center">¿Por qué este pack es diferente?</h2>
          <div className="benefits-list">
            <div className="benefit-item">
              <div className="icon">📈</div>
              <div>
                <h3>Publicá contenido viral TODOS LOS DÍAS</h3>
                <p>
                  Sin crear nada desde cero. Elegí un video, publicá y dejá que el algoritmo trabaje por vos.
                </p>
              </div>
            </div>
            <div className="benefit-item">
              <div className="icon">⏱️</div>
              <div>
                <h3>Ahorrá cientos de horas</h3>
                <p>
                  Nada de grabar, editar o buscar clips por internet. Todo está listo y organizado por nicho.
                </p>
              </div>
            </div>
            <div className="benefit-item">
              <div className="icon">💰</div>
              <div>
                <h3>Invertí una sola vez</h3>
                <p>No es suscripción. No es mensualidad. Pagás una vez y el pack es tuyo para siempre.</p>
              </div>
            </div>
            <div className="benefit-item">
              <div className="icon">🌍</div>
              <div>
                <h3>Funciona en TODAS las plataformas</h3>
                <p>Instagram Reels, TikTok, YouTube Shorts, Facebook Reels, Pinterest — donde quieras.</p>
              </div>
            </div>
            <div className="benefit-item">
              <div className="icon">🔓</div>
              <div>
                <h3>Usá los videos como quieras</h3>
                <p>Para tus cuentas, para clientes, para tu marca — sin restricciones. Son tuyos.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 8 — REVIEWS */}
      <section className="bg-alt">
        <div className="container fade-in">
          <h2 className="text-center">
            Tenemos más de 10.000 alumnos y aquí están los comentarios de algunos de ellos:
          </h2>
          <div className="review-carousel">
            <div className="review-track">
              <img src="imgs/testemunho1.webp" alt="Testimonio de cliente 1" className="review-img" />
              <img src="imgs/testemunho2.webp" alt="Testimonio de cliente 2" className="review-img" />
              <img src="imgs/testemunho3.webp" alt="Testimonio de cliente 3" className="review-img" />
              <img src="imgs/testemunho4.webp" alt="Testimonio de cliente 4" className="review-img" />
              <img src="imgs/testemunho5.webp" alt="Testimonio de cliente 5" className="review-img" />
              <img src="imgs/testemunho6.webp" alt="Testimonio de cliente 6" className="review-img" />
              {/* Duplicate for infinite scroll */}
              <img src="imgs/testemunho1.webp" alt="Testimonio de cliente 1" className="review-img" />
              <img src="imgs/testemunho2.webp" alt="Testimonio de cliente 2" className="review-img" />
              <img src="imgs/testemunho3.webp" alt="Testimonio de cliente 3" className="review-img" />
              <img src="imgs/testemunho4.webp" alt="Testimonio de cliente 4" className="review-img" />
              <img src="imgs/testemunho5.webp" alt="Testimonio de cliente 5" className="review-img" />
              <img src="imgs/testemunho6.webp" alt="Testimonio de cliente 6" className="review-img" />
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 8B — BÔNUS */}
      <section>
        <div className="container fade-in">
          <h2 className="text-center">🎁 Bonus Exclusivos — Incluidos GRATIS con tu compra</h2>
          <div className="bonus-grid">
            <div className="bonus-card">
              <img src="imgs/bonus1.jpeg" alt="Guía de Horarios y Hashtags Virales" />
              <div className="bonus-content">
                <h3>⏰ Guía de Horarios y Hashtags Virales</h3>
                <p>
                  Descubrí los mejores horarios para publicar y los hashtags que realmente impulsan el alcance
                  de tus videos para llegar a miles de personas todos los días.
                </p>
              </div>
            </div>
            <div className="bonus-card">
              <img src="imgs/bonus2.jpeg" alt="Audios y Músicas Motivacionales" />
              <div className="bonus-content">
                <h3>🎵 Audios y Músicas Motivacionales</h3>
                <p>
                  Recibí una selección de músicas y audios en tendencia en TikTok para aumentar el engagement y
                  hacer tus publicaciones aún más atractivas.
                </p>
              </div>
            </div>
            <div className="bonus-card">
              <img src="imgs/bonus3.webp" alt="Monetización Oculta con IA" />
              <div className="bonus-content">
                <h3>🤖 Monetización Oculta con IA</h3>
                <p>
                  Desde lo básico hasta lo avanzado, aprendé paso a paso cómo crecer en TikTok y monetizar tu
                  cuenta sin complicaciones.
                </p>
              </div>
            </div>
            <div className="bonus-card">
              <img src="imgs/bonus4.jpeg" alt="Pack Profesional de Ediciones" />
              <div className="bonus-content">
                <h3>✨ Pack Profesional de Ediciones (Transiciones, Efectos Sonoros y Backgrounds)</h3>
                <p>
                  Transformá tus videos en producciones profesionales con transiciones impactantes, efectos
                  sonoros envolventes y backgrounds listos para explotar en las redes sociales.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 9 — PREÇO */}
      <section id="checkout" className="price-section">
        <div className="container fade-in">
          <h2 className="text-center">Aprovechá esta oferta antes de que suba el precio</h2>
          <div className="price-card">
            <img src="imgs/mockup_preco.png" alt="Viral Pack Pro Mockup" className="price-card-img" />
            <ul className="checklist">
              <li>
                <span className="text-neon">✅</span> +250.000 videos virales en MP4
              </li>
              <li>
                <span className="text-neon">✅</span> +50 nichos organizados por carpeta
              </li>
              <li>
                <span className="text-neon">✅</span> Videos sin rostro
              </li>
              <li>
                <span className="text-neon">✅</span> Uso libre — sin restricciones
              </li>
              <li>
                <span className="text-neon">✅</span> Acceso instantáneo
              </li>
              <li>
                <span className="text-neon">✅</span> Garantía de satisfacción de 7 días
              </li>
              <li>
                <span className="text-neon">✅</span> Actualizaciones futuras gratis
              </li>
              <li>
                <span className="text-neon">🎁</span>{' '}
                <strong className="text-neon">BONUS:</strong> Guía de Horarios y Hashtags Virales
              </li>
              <li>
                <span className="text-neon">🎁</span>{' '}
                <strong className="text-neon">BONUS:</strong> Audios y Músicas Motivacionales
              </li>
              <li>
                <span className="text-neon">🎁</span>{' '}
                <strong className="text-neon">BONUS:</strong> Monetización Oculta con IA
              </li>
              <li>
                <span className="text-neon">🎁</span>{' '}
                <strong className="text-neon">BONUS:</strong> Pack Profesional de Ediciones
              </li>
            </ul>
            <div className="pricing-cta-block">
              <div className="strike-container text-sec">
                De <span className="text-strike">$29.90</span> por solo
              </div>
              <div className="real-price text-neon">$5.90</div>
              <div className="subtexto text-sec">(Acceso de por vida — pago único)</div>
              <a
                href="https://pay.hotmart.com/X104905752L?checkoutMode=10"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-green"
              >
                COMPRAR AHORA CON DESCUENTO
              </a>
              <div className="scarcity-box">
                ⏳ <strong className="text-alert">¡ATENCIÓN!</strong> La oferta promocional finaliza hoy:{' '}
                <span id="dynamic-date" className="text-alert-date">
                  {currentDateFormatted}
                </span>{' '}
                a las 23:59hs.
              </div>
            </div>
            <div className="microcopy text-sec">
              🔒 Pago 100% seguro por Hotmart · Acceso inmediato después de la compra
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 10B — GARANTIA */}
      <section>
        <div className="container fade-in">
          <div className="guarantee-card">
            <img src="imgs/garantia.jpeg" alt="Garantía de Satisfacción" className="guarantee-img" />
            <h2 className="guarantee-title">Tu compra está 100% protegida</h2>
            <p className="guarantee-text">
              Si por cualquier motivo no estás satisfecho con el Viral Pack Pro, tenés 7 días para pedir la
              devolución completa de tu dinero. Sin preguntas, sin complicaciones, sin letra chica. O te encanta o
              te devolvemos cada centavo.
            </p>
            <p className="guarantee-subtext">
              Garantía válida por 7 días después de la compra — procesada directamente por Hotmart.
            </p>
          </div>
        </div>
      </section>

      {/* SEÇÃO 11 — FAQ */}
      <section className="bg-alt">
        <div className="container fade-in">
          <h2 className="text-center">Preguntas Frecuentes</h2>
          <div className="faq-container">
            {FAQ_DATA.map((item, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className={`faq-item ${isOpen ? 'active' : ''}`}>
                  <div className="faq-question" onClick={() => toggleFaq(idx)}>
                    <h3>{item.q}</h3>
                    <span className="icon">+</span>
                  </div>
                  <div
                    className="faq-answer"
                    style={{
                      maxHeight: isOpen ? '300px' : '0px'
                    }}
                  >
                    <p>{item.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SEÇÃO 12 — FINAL CTA */}
      <section className="final-cta">
        <div className="container text-center fade-in">
          <h2>No sigas perdiendo tiempo creando contenido desde cero</h2>
          <p className="final-text">
            Mientras vos estás grabando, editando y buscando ideas… otros ya están publicando contenido viral todos
            los días con este pack.
          </p>
          <p className="final-small text-neon">
            250.000 videos. 50 nichos. Listos para usar. Por menos de lo que cuesta un café.
          </p>
          <a href="#checkout" className="btn">
            QUIERO MI PACK AHORA — $5.90 USD
          </a>
        </div>
      </section>

      {/* SEÇÃO 13 — FOOTER */}
      <footer>
        <div className="container text-center fade-in">
          <p className="text-sec">© 2026 Viral Pack Pro. Todos los derechos reservados.</p>
          <p className="text-sec">
            Este producto es 100% digital. Después de la compra, recibirás acceso inmediato por email.
          </p>
          <p className="text-sec">Para soporte: soporte@viralpackpro.com</p>
        </div>
      </footer>

      {/* POPUP COMPRA */}
      <div id="sales-popup" className={`sales-popup ${popupVisible ? 'show' : 'hide'}`}>
        <div className="popup-close" onClick={() => setPopupVisible(false)}>
          ✕
        </div>
        <img src="imgs/mockup_preco.png" alt="Viral Pack Pro" className="popup-img" />
        <div className="popup-content">
          <div className="popup-badge">✓ COMPRA VERIFICADA</div>
          <p className="popup-title">
            <strong id="popup-name">{popupData.name}</strong> adquirió{' '}
            <strong>Pack Viral Master Pro</strong>
          </p>
          <p className="popup-time">
            📍 <span id="popup-location">{popupData.location}</span> · hace{' '}
            <span id="popup-time-ago">{popupData.timeAgo}</span> minutos
          </p>
        </div>
      </div>
    </div>
  );
}
