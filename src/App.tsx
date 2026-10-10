import { useRef, useState, type ReactNode, type CSSProperties } from "react"

function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const paths: Record<string, ReactNode> = {
    arrow: (
      <>
        <path d="M4 12h16M14 6l6 6-6 6" />
      </>
    ),
    heart: (
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
    ),
    pin: (
      <>
        <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    home: (
      <>
        <path d="m3 10 9-7 9 7M5 9v12h14V9M9 21v-8h6v8" />
      </>
    ),
    search: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m16 16 5 5" />
      </>
    ),
    chat: (
      <>
        <path d="M21 11.5a9 9 0 0 1-9 9 10 10 0 0 1-4-.9L3 21l1.4-4.7A9 9 0 1 1 21 11.5Z" />
        <path d="M8 8c0 4 4 8 8 8l1-2-3-2-1 1-2-2 1-1-2-3Z" />
      </>
    ),
    bed: (
      <>
        <path d="M3 18V7m18 11v-7H3m0 5h18M7 11V7h5v4m1 0V7h5v4" />
      </>
    ),
    bath: (
      <>
        <path d="M3 12h18v3a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5ZM6 12V5a2 2 0 0 1 4 0M7 20v2m10-2v2" />
      </>
    ),
    area: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="3" />
        <path d="m8 16 8-8m-8 4v4h4m0-8h4v4" />
      </>
    ),
    key: (
      <>
        <circle cx="8" cy="8" r="5" />
        <path d="m12 12 9 9m-3-3 3-3m-6 0 3-3" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    star: (
      <path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5Z" />
    ),
    insta: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <path d="M17.5 6.5h.01" />
      </>
    ),
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] || paths.home}
    </svg>
  )
}

function ParticleButton({
  children,
  onClick,
  secondary = false,
  className = "",
}: {
  children: ReactNode
  onClick?: () => void
  secondary?: boolean
  className?: string
}) {
  const [particles, setParticles] = useState<{
    id: number
    x: number
    y: number
  }[]>([])
  const last = useRef(0)
  return (
    <button
      className={`button ${secondary ? "secondary" : ""} ${className}`}
      onClick={onClick}
      onPointerMove={(e) => {
        if (
          e.pointerType === "touch" ||
          window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
          Date.now() - last.current < 90
        )
          return
        last.current = Date.now()
        const rect = e.currentTarget.getBoundingClientRect()
        setParticles((p) => [
          ...p.slice(-10),
          { id: Date.now(), x: e.clientX - rect.left, y: e.clientY - rect.top },
        ])
      }}
    >
      {children}
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={
            {
              left: p.x,
              top: p.y,
              "--drift": `${(p.id % 50) - 25}px`,
            } as CSSProperties
          }
          onAnimationEnd={() =>
            setParticles((ps) => ps.filter((x) => x.id !== p.id))
          }
        >
          <Icon name="star" size={12} />
        </span>
      ))}
    </button>
  )
}
const properties = [
  {
    id: 1,
    name: "Apartamento com 2 quartos",
    location: "Cuiabá · MT",
    price: 1500,
    beds: 2,
    baths: 1,
    area: 65,
    type: "Apartamento",
    image: "home-1.png",
    badge: "Destaque",
    description:
      "Apartamento demonstrativo com 2 quartos, 1 banheiro e 65 m². Informações e valor são ilustrativos nesta prévia.",
  },
  {
    id: 2,
    name: "Apartamento com 2 quartos e 2 banheiros",
    location: "Várzea Grande · MT",
    price: 1800,
    beds: 2,
    baths: 2,
    area: 78,
    type: "Apartamento",
    image: "home-2.png",
    badge: "Novo",
    description:
      "Apartamento demonstrativo com 2 quartos, 2 banheiros e 78 m². Informações e valor são ilustrativos nesta prévia.",
  },
  {
    id: 3,
    name: "Kitnet com 1 quarto",
    location: "Rondonópolis · MT",
    price: 1200,
    beds: 1,
    baths: 1,
    area: 48,
    type: "Kitnet",
    image: "home-1.png",
    badge: "Disponível",
    description:
      "Kitnet demonstrativa com 1 quarto, 1 banheiro e 48 m². Informações e valor são ilustrativos nesta prévia.",
  },
]
const money = (value: number) => value.toLocaleString("pt-BR")
function Brand() {
  return (
    <a href="#inicio" className="brand">
      <img src="images/logo.png" alt="Logo da Tamily Imóveis" />
      <span>
        Tamily<span>IMÓVEIS</span>
      </span>
    </a>
  )
}
export default function App() {
  const [menu, setMenu] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([])
  const [filter, setFilter] = useState({
    location: "",
    type: "",
    price: "",
    rooms: "",
  })
  const [applied, setApplied] = useState(filter)
  const [tab, setTab] = useState("Todos")
  const [modal, setModal] =
    useState<"contact" | "instagram" | typeof properties[number] | null>(null)
  const [onlyFavorites, setOnlyFavorites] = useState(false)
  const goProperties = () =>
    document.getElementById("imoveis")?.scrollIntoView({ behavior: "smooth" })
  const visible = properties.filter(
    (p) =>
      (!applied.location ||
        p.location.toLowerCase().includes(applied.location.toLowerCase())) &&
      (!applied.type || p.type === applied.type) &&
      (!applied.price || p.price <= Number(applied.price)) &&
      (!applied.rooms || p.beds >= Number(applied.rooms)) &&
      (tab === "Todos" || p.type === tab) &&
      (!onlyFavorites || favorites.includes(p.id)),
  )
  return (
    <div>
      <header>
        <div className="container header-inner">
          <Brand />
          <nav className={menu ? "open" : ""}>
            {[
              ["Início", "inicio"],
              ["Imóveis", "imoveis"],
              ["Sobre", "sobre"],
              ["Contato", "contato"],
            ].map(([label, id]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>
                {label}
              </a>
            ))}
          </nav>
          <ParticleButton
            className="header-contact"
            onClick={() => setModal("contact")}
          >
            <Icon name="chat" size={18} /> Falar no WhatsApp
          </ParticleButton>
          <button
            className="menu-button"
            aria-label="Abrir menu"
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            <Icon name={menu ? "close" : "menu"} />
          </button>
        </div>
      </header>
      <main>
        <section className="hero" id="inicio">
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">
                <span className="little-dot" /> TAMILY IMÓVEIS
              </span>
              <h1>
                imóveis para alugar
                <br />
                no <span>
                  Mato Grosso
                  <svg viewBox="0 0 180 12">
                    <path d="M3 8Q85-3 177 6" />
                  </svg>
                </span>
                <span className="heading-star">
                  <Icon name="star" size={35} />
                </span>
              </h1>
              <p>
                consulte os imóveis desta prévia e filtre por cidade, tipo, preço e quantidade de quartos.
              </p>
              <div className="hero-buttons">
                <ParticleButton onClick={goProperties}>
                  Ver imóveis <Icon name="arrow" />
                </ParticleButton>
                <ParticleButton secondary onClick={() => setModal("contact")}>
                  <Icon name="chat" size={18} /> Falar com a Tamily
                </ParticleButton>
              </div>
            </div>
            <div className="hero-visual">
              <div className="image-decoration" />
              <img
                className="hero-image"
                src="images/home-2.png"
                alt="Sala iluminada com plantas, sofá e piso de madeira"
              />
              <span className="visual-star">
                <Icon name="star" size={34} />
              </span>
            </div>
          </div>
        </section>
        <div className="container search-container">
          <form
            className="search-box"
            onSubmit={(e) => {
              e.preventDefault()
              setApplied(filter)
              goProperties()
            }}
          >
            <label>
              <span>
                <Icon name="pin" size={16} /> Onde você quer morar?
              </span>
              <input
                placeholder="Cidade ou bairro"
                value={filter.location}
                onChange={(e) =>
                  setFilter({ ...filter, location: e.target.value })
                }
              />
            </label>
            <label>
              <span>
                <Icon name="home" size={16} /> Tipo de imóvel
              </span>
              <select
                value={filter.type}
                onChange={(e) => setFilter({ ...filter, type: e.target.value })}
              >
                <option value="">Todos os tipos</option>
                <option>Apartamento</option>
                <option>Casa</option>
                <option>Kitnet</option>
              </select>
            </label>
            <label>
              <span>Faixa de preço</span>
              <select
                value={filter.price}
                onChange={(e) =>
                  setFilter({ ...filter, price: e.target.value })
                }
              >
                <option value="">Qualquer valor</option>
                <option value="1500">Até R$ 1.500</option>
                <option value="2000">Até R$ 2.000</option>
                <option value="3000">Até R$ 3.000</option>
              </select>
            </label>
            <label>
              <span>Quartos</span>
              <select
                value={filter.rooms}
                onChange={(e) =>
                  setFilter({ ...filter, rooms: e.target.value })
                }
              >
                <option value="">Qualquer quantidade</option>
                <option value="1">1 ou mais</option>
                <option value="2">2 ou mais</option>
                <option value="3">3 ou mais</option>
              </select>
            </label>
            <button className="button search-button" type="submit">
              <Icon name="search" size={19} /> Buscar imóveis
            </button>
          </form>
        </div>
        <section className="properties container" id="imoveis">
          <div className="section-top">
            <div>
              <span className="eyebrow">IMÓVEIS PARA ALUGAR</span>
              <h2>
                imóveis disponíveis
                <br />nesta prévia<span className="pink-period">.</span>
              </h2>
              <p>Veja os imóveis demonstrativos disponíveis nesta prévia.</p>
            </div>
            <button
              className={`favorites-link ${onlyFavorites ? "active" : ""}`}
              onClick={() => setOnlyFavorites(!onlyFavorites)}
            >
              <Icon name="heart" size={18} />{" "}
              {onlyFavorites
                ? "Ver todos os imóveis"
                : `Meus favoritos${
                    favorites.length ? ` (${favorites.length})` : ""
                  }`}
            </button>
          </div>
          <div className="tabs">
            {["Todos", "Apartamento", "Casa", "Kitnet"].map((t) => (
              <button
                className={tab === t ? "selected" : ""}
                key={t}
                onClick={() => setTab(t)}
              >
                {t === "Apartamento"
                  ? "Apartamentos"
                  : t === "Casa"
                    ? "Casas"
                    : t === "Kitnet"
                      ? "Kitnets"
                      : t}
              </button>
            ))}
          </div>
          <div className="property-grid">
            {visible.map((p) => (
              <article className="property-card" key={p.id}>
                <div className="card-image">
                  <img src={`images/${p.image}`} alt={p.name} loading="lazy" />
                  <span className={`badge ${p.badge === "Novo" ? "pink" : ""}`}>
                    {p.badge}
                  </span>
                  <button
                    className={`favorite ${
                      favorites.includes(p.id) ? "saved" : ""
                    }`}
                    aria-label={`${
                      favorites.includes(p.id) ? "Remover" : "Adicionar"
                    } ${p.name} dos favoritos`}
                    aria-pressed={favorites.includes(p.id)}
                    onClick={() =>
                      setFavorites((f) =>
                        f.includes(p.id)
                          ? f.filter((id) => id !== p.id)
                          : [...f, p.id],
                      )
                    }
                  >
                    <Icon name="heart" size={19} />
                  </button>
                </div>
                <div className="card-content">
                  <h3>{p.name}</h3>
                  <div className="location">
                    <Icon name="pin" size={15} /> {p.location}
                  </div>
                  <div className="price">
                    R$ {money(p.price)}
                    <span> / mês</span>
                  </div>
                  <div className="amenities">
                    <span>
                      <Icon name="bed" size={18} />
                      {p.beds} quartos
                    </span>
                    <span>
                      <Icon name="bath" size={18} />
                      {p.baths} {p.baths === 1 ? "banheiro" : "banheiros"}
                    </span>
                    <span>
                      <Icon name="area" size={17} />
                      {p.area} m²
                    </span>
                  </div>
                  <button
                    className="details-button"
                    onClick={() => setModal(p)}
                  >
                    Ver detalhes <Icon name="arrow" size={18} />
                  </button>
                </div>
              </article>
            ))}
          </div>
          {!visible.length && (
            <div className="empty">
              <Icon name="search" size={30} />
              <h3>Nenhum cantinho por aqui ainda.</h3>
              <p>Tente outros filtros ou conte para a Tamily o que procura.</p>
              <ParticleButton
                secondary
                onClick={() => {
                  const clear = { location: "", type: "", price: "", rooms: "" }
                  setFilter(clear)
                  setApplied(clear)
                  setTab("Todos")
                  setOnlyFavorites(false)
                }}
              >
                Limpar filtros
              </ParticleButton>
            </div>
          )}
          <p className="demo-note">
            Imóveis, valores e demais dados desta página são ilustrativos nesta prévia.
          </p>
        </section>
        <section className="about" id="sobre">
          <div className="container about-grid">
            <div className="about-art">
              <span className="about-small-star">
                <Icon name="star" size={30} />
              </span>
              <img
                src="images/logo.png"
                alt="Logo da Tamily Imóveis"
              />
            </div>
            <div className="about-copy">
              <span className="eyebrow">PRAZER, TAMILY IMÓVEIS</span>
              <h2>
                sobre a Tamily Imóveis<span className="pink-period">.</span>
              </h2>
              <p>
                esta página é uma prévia inicial do site. os dados definitivos dos imóveis e os contatos oficiais serão adicionados quando forem informados.
              </p>
              <a className="text-link" href="#contato">
                Ver formas de contato <Icon name="arrow" size={18} />
              </a>
            </div>
          </div>
        </section>
        <section className="container final-cta" id="contato">
          <div className="cta-decoration">
            <Icon name="star" size={46} />
          </div>
          <span className="eyebrow">CONTATO</span>
          <h2>precisa de informações sobre um imóvel?</h2>
          <p>o contato oficial será disponibilizado aqui quando for informado.</p>
          <ParticleButton onClick={() => setModal("contact")}>
            <Icon name="chat" /> Falar no WhatsApp{" "}
            <Icon name="arrow" size={18} />
          </ParticleButton>
          <span className="cta-heart">
            <Icon name="heart" size={35} />
          </span>
        </section>
      </main>
      <footer className="container">
        <div className="footer-top">
          <div>
            <Brand />
            <p>Aluguel de imóveis.</p>
          </div>
          <div className="footer-nav">
            <a href="#inicio">Início</a>
            <a href="#imoveis">Imóveis</a>
            <a href="#sobre">Sobre</a>
            <a href="#contato">Contato</a>
          </div>
          <div className="social">
            <button onClick={() => setModal("contact")}>
              <Icon name="chat" size={18} /> WhatsApp
            </button>
            <button onClick={() => setModal("instagram")}>
              <Icon name="insta" size={18} /> Instagram
            </button>
          </div>
        </div>
        <div className="footer-bottom">
          <span>Tamily Imóveis</span>
          <span>Site demonstrativo da Tamily Imóveis.</span>
        </div>
      </footer>
      {modal && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <section
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              aria-label="Fechar"
              onClick={() => setModal(null)}
              autoFocus
            >
              <Icon name="close" />
            </button>
            {typeof modal === "object" ? (
              <>
                <img
                  className="modal-image"
                  src={`images/${modal.image}`}
                  alt={modal.name}
                />
                <span className="eyebrow">IMÓVEL DEMONSTRATIVO</span>
                <h2 id="modal-title">{modal.name}</h2>
                <p>{modal.location}</p>
                <p>{modal.description}</p>
                <div className="amenities">
                  <span>{modal.beds} quartos</span>
                  <span>{modal.baths} banheiro(s)</span>
                  <span>{modal.area} m²</span>
                </div>
                <div className="price">
                  R$ {money(modal.price)}
                  <span> / mês</span>
                </div>
                <ParticleButton onClick={() => setModal("contact")}>
                  <Icon name="chat" /> Tenho interesse
                </ParticleButton>
              </>
            ) : (
              <>
                <span className="modal-symbol">
                  <Icon
                    name={modal === "instagram" ? "insta" : "chat"}
                    size={32}
                  />
                </span>
                <h2 id="modal-title">
                  {modal === "instagram"
                    ? "Vamos nos conectar?"
                    : "Vamos encontrar seu cantinho?"}
                </h2>
                <p>
                  {modal === "instagram"
                    ? "O Instagram oficial ainda não foi informado. Assim que a Tamily enviar o perfil, ele será adicionado aqui. Nenhum contato foi inventado nesta prévia."
                    : "O número oficial de WhatsApp ainda não foi informado. Assim que a Tamily enviar o contato, ele será adicionado aqui. Nenhum contato foi inventado nesta prévia."}
                </p>
                <ParticleButton onClick={() => setModal(null)}>
                  Entendi <Icon name="heart" size={17} />
                </ParticleButton>
              </>
            )}
          </section>
        </div>
      )}
    </div>
  )
}
