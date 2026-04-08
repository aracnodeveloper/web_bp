import React from 'react';


const docs = [
  {
    title: 'Marca Personal y Oportunidades de Colaboración',
    description: 'Aprende conmigo como establecer tu marca personal.',
    previewImg: '/images/img_12.png',
    url: 'https://drive.google.com/file/d/1CHxdbi4WEvzkcVLODKdHy1Sl2TXNcfmM/view',
  },
  {
    title: 'Posicionamiento en Redes Sociales',
    description: 'Conoce la forma de posicionarte en redes sociales.',
    previewImg: '/images/img_12.png',
    url: 'https://drive.google.com/file/d/1NNMFwq2a_GXFePFdNqQRUBpuriMqeEKy/view',
  },
];

/* ── Iconos ── */
function ExternalIcon() {
  return (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </svg>
  );
}

function DownloadIcon() {
  return (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
  );
}

function DocIcon() {
  return (
      <svg width="52" height="52" viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <rect x="10" y="4" width="36" height="46" rx="4" fill="#CBD5E1" />
        <path d="M38 4v12h12" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="10" y="4" width="36" height="46" rx="4" stroke="#94A3B8" strokeWidth="2" />
        <line x1="20" y1="28" x2="40" y2="28" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="20" y1="35" x2="40" y2="35" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="20" y1="42" x2="32" y2="42" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
  );
}

/* ── Botón de acción ── */
function ActionBtn({ children, onClick, label, variant }) {
  return (
      <button
          aria-label={label}
          title={label}
          onClick={onClick}
          className={`
        w-[38px] h-[38px] rounded-[10px] border-none flex items-center justify-center
        cursor-pointer transition-all duration-150 active:scale-90
        ${variant === 'ghost'
              ? 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700'
              : 'bg-green-500 text-white shadow-[0_2px_8px_rgba(34,197,94,.35)] hover:bg-green-600'
          }
      `}
      >
        {children}
      </button>
  );
}

/* ── Card ── */
function DocCard({ doc }) {
  const handleOpen = () =>
      window.open(doc.url, '_blank', 'noopener,noreferrer');

  // Convierte la URL de Google Drive a enlace de descarga directa
  const getDownloadUrl = (url) => {
    const match = url.match(/\/d\/(.*?)\/view/);
    if (match) return `https://drive.google.com/uc?export=download&id=${match[1]}`;
    return url;
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = getDownloadUrl(doc.url);
    a.download = `${doc.title}.pdf`;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
      <article className="
      bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col
      shadow-[0_2px_14px_rgba(0,0,0,.07)]
      hover:shadow-[0_10px_36px_rgba(0,0,0,.13)] hover:-translate-y-1
      transition-all duration-200
    ">
        {/* 75% — Imagen de portada */}
        <div className="relative bg-slate-100 overflow-hidden" style={{ flex: '0 0 75%', minHeight: '320px' }}>
          {doc.previewImg ? (
              <img
                  src={doc.previewImg}
                  alt={`Portada de ${doc.title}`}
                  className="w-full h-full object-cover object-top"
              />
          ) : (
              /* Fallback si no hay imagen */
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <DocIcon />
                <span className="text-sm text-slate-400 font-medium">Vista previa</span>
              </div>
          )}
        </div>

        {/* 25% — Info + botones */}
        <div className="border-t border-slate-200 px-4 py-3 flex items-center justify-between gap-3 mb-2"
             style={{ flex: '0 0 25%' }}>
          <div className="flex-1 min-w-0">
            <h3 className="text-[0.95rem] font-bold text-slate-800 truncate mb-1">
              {doc.title}
            </h3>
            <p className="text-[0.78rem] text-slate-500 leading-snug line-clamp-2">
              {doc.description}
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <ActionBtn label={`Abrir ${doc.title}`} onClick={handleOpen} variant="ghost">
              <ExternalIcon />
            </ActionBtn>
            <ActionBtn label={`Descargar ${doc.title}`} onClick={handleDownload} variant="primary">
              <DownloadIcon />
            </ActionBtn>
          </div>
        </div>
      </article>
  );
}

/* ── Componente principal ── */
export default function Documentos() {
  return (
      <section className="bg-slate-100 px-8 py-12 pb-16">
        <h2 className='text-3xl text-center font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#005F6B] to-[#96c121] mb-5'>Documentos</h2>
        <div className="grid grid-cols-2 gap-2 max-w-6xl mx-auto px-8">
          {docs.map((doc) => (
              <DocCard key={doc.title} doc={doc} />
          ))}
        </div>
      </section>
  );
}