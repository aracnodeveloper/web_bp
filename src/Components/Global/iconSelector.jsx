import React, { useState } from "react";

// Lista de iconos disponibles organizados por categorías
export const ICON_LIST = [
  {
    category: "Premios y Logros",
    icons: [
      {
        value: "icon-[material-symbols--award-star-rounded]",
        label: "Estrella de Premio",
      },
      { value: "icon-[material-symbols--trophy]", label: "Trofeo" },
      {
        value: "icon-[material-symbols--social-leaderboard]",
        label: "Medalla",
      },
      { value: "icon-[material-symbols--workspace-premium]", label: "Premium" },
      { value: "icon-[material-symbols--grade]", label: "Grado/Estrella" },
      {
        value: "icon-[material-symbols--military-tech]",
        label: "Insignia Militar",
      },
      { value: "icon-[material-symbols--id-card]", label: "certificacion" },
    ],
  },
  {
    category: "Educación",
    icons: [
      { value: "icon-[material-symbols--school]", label: "Escuela" },
      { value: "icon-[material-symbols--menu-book]", label: "Libro" },
      { value: "icon-[material-symbols--book]", label: "Libro Simple" },
      {
        value: "icon-[material-symbols--history-edu]",
        label: "Educación Historia",
      },
      { value: "icon-[material-symbols--science]", label: "Ciencia" },
    ],
  },
  {
    category: "Negocios",
    icons: [
      { value: "icon-[material-symbols--business-center]", label: "Maletín" },
      { value: "icon-[material-symbols--work]", label: "Trabajo" },
      {
        value: "icon-[material-symbols--handshake]",
        label: "Apretón de Manos",
      },
      { value: "icon-[material-symbols--rocket-launch]", label: "Cohete" },
      {
        value: "icon-[material-symbols--trending-up]",
        label: "Tendencia Arriba",
      },
    ],
  },
  {
    category: "Ubicación y Eventos",
    icons: [
      { value: "icon-[material-symbols--location-on]", label: "Ubicación" },
      { value: "icon-[material-symbols--event]", label: "Evento" },
      { value: "icon-[material-symbols--calendar-today]", label: "Calendario" },
      { value: "icon-[material-symbols--flag]", label: "Bandera" },
      { value: "icon-[material-symbols--location-on]", label: "Lugar" },
    ],
  },
  {
    category: "Personas y Comunicación",
    icons: [
      { value: "icon-[material-symbols--groups]", label: "Grupos" },
      { value: "icon-[material-symbols--person]", label: "Persona" },
      { value: "icon-[material-symbols--campaign]", label: "Campaña" },
      { value: "icon-[material-symbols--mic]", label: "Micrófono" },
      { value: "icon-[material-symbols--forum]", label: "Foro" },
    ],
  },
  {
    category: "Otros",
    icons: [
      { value: "icon-[material-symbols--star]", label: "Estrella" },
      { value: "icon-[material-symbols--favorite]", label: "Corazón" },
      { value: "icon-[material-symbols--check-circle]", label: "Check" },
      { value: "icon-[material-symbols--lightbulb]", label: "Idea" },
      { value: "icon-[material-symbols--verified]", label: "Verificado" },
    ],
  },
];

// Componente selector de iconos
export const IconSelector = ({ value, onChange, className = "" }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Filtrar iconos basado en búsqueda
  const filteredCategories = ICON_LIST.map((category) => ({
    ...category,
    icons: category.icons.filter((icon) =>
      icon.label.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter((category) => category.icons.length > 0);

  // Encontrar el icono seleccionado
  const selectedIcon = ICON_LIST.flatMap((cat) => cat.icons).find(
    (icon) => icon.value === value
  );

  return (
    <div className={`relative ${className}`}>
      {/* Input/Botón principal */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#96c121] focus:border-transparent text-left flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          {value && <span className={`${value} h-5 w-5 text-[#96c121]`}></span>}
          <span className="text-sm">
            {selectedIcon ? selectedIcon.label : "Seleccionar icono..."}
          </span>
        </div>
        <span className="icon-[material-symbols--arrow-drop-down] h-5 w-5"></span>
      </button>

      {/* Dropdown de iconos */}
      {isOpen && (
        <>
          {/* Overlay para cerrar */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Panel de selección */}
          <div className="absolute z-20 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-y-auto">
            {/* Búsqueda */}
            <div className="sticky top-0 bg-white p-2 border-b">
              <input
                type="text"
                placeholder="Buscar icono..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-[#96c121] focus:border-transparent"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            {/* Opción para limpiar */}
            <button
              type="button"
              onClick={() => {
                onChange("");
                setIsOpen(false);
              }}
              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 border-b"
            >
              <span className="text-gray-500 italic">Sin icono</span>
            </button>

            {/* Lista de iconos por categoría */}
            {filteredCategories.map((category) => (
              <div key={category.category}>
                <div className="px-3 py-2 bg-gray-50 text-xs font-semibold text-gray-700 border-b">
                  {category.category}
                </div>
                <div className="grid grid-cols-2 gap-1 p-2">
                  {category.icons.map((icon) => (
                    <button
                      key={icon.value}
                      type="button"
                      onClick={() => {
                        onChange(icon.value);
                        setIsOpen(false);
                        setSearchTerm("");
                      }}
                      className={`flex items-center gap-2 px-2 py-2 rounded text-sm hover:bg-gray-100 transition-colors ${
                        value === icon.value
                          ? "bg-[#96c121] bg-opacity-10 text-[#96c121]"
                          : ""
                      }`}
                    >
                      <span className={`${icon.value} h-5 w-5`}></span>
                      <span className="text-xs truncate">{icon.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {filteredCategories.length === 0 && (
              <div className="p-4 text-center text-sm text-gray-500">
                No se encontraron iconos
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

// Componente simple de select (alternativa más simple)
export const IconSelectSimple = ({ value, onChange, className = "" }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#96c121] focus:border-transparent ${className}`}
    >
      <option value="">Sin icono</option>
      {ICON_LIST.map((category) => (
        <optgroup key={category.category} label={category.category}>
          {category.icons.map((icon) => (
            <option key={icon.value} value={icon.value}>
              {icon.label}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  );
};

export default IconSelector;
