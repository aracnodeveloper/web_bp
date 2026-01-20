import React, { useState } from "react";
import { useLocation } from "../../../hooks/useMetrics";

const AdminLocation = () => {
  const { items, loading, createItem, updateItem, deleteItem } = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [activeTab, setActiveTab] = useState("country");
  const [formData, setFormData] = useState({
    title: "",
    colors: "",
    orderIndex: 0,
    rise: 0,
    type: "country",
    isActive: true,
  });

  const handleOpenModal = (item = null, type = "country") => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title,
        colors: item.colors || "",
        orderIndex: item.orderIndex || 0,
        rise: item.rise || 0,
        type: item.type,
        isActive: item.isActive,
      });
    } else {
      setEditingItem(null);
      const filteredItems = items.filter((i) => i.type === type);
      setFormData({
        title: "",
        colors: "",
        orderIndex: filteredItems.length,
        rise: 0,
        type: type,
        isActive: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dataToSend = {
        ...formData,
        rise: parseFloat(formData.rise),
        orderIndex: parseInt(formData.orderIndex),
      };

      if (editingItem) {
        await updateItem(editingItem.id, dataToSend);
      } else {
        await createItem(dataToSend);
      }

      handleCloseModal();
    } catch (error) {
      alert("Error al guardar");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta ubicación?")) {
      try {
        await deleteItem(id);
      } catch (error) {
        alert("Error al eliminar");
      }
    }
  };

  const countries = items
    .filter((item) => item.type === "country")
    .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0));
  const cities = items
    .filter((item) => item.type === "city")
    .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0));

  if (loading && items.length === 0) {
    return <div className="text-center py-8">Cargando...</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Distribución Geográfica
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Gestiona la distribución de seguidores por países y ciudades
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab("country")}
          className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
            activeTab === "country"
              ? "bg-gradient-to-r from-[#96c121] to-[#005F6B] text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          🌍 Países ({countries.length})
        </button>
        <button
          onClick={() => setActiveTab("city")}
          className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
            activeTab === "city"
              ? "bg-gradient-to-r from-[#96c121] to-[#005F6B] text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          🏙️ Ciudades ({cities.length})
        </button>
      </div>

      {/* Botón agregar */}
      <div className="mb-4">
        <button
          onClick={() => handleOpenModal(null, activeTab)}
          className="bg-[#96c121] text-white px-4 py-2 rounded-lg hover:bg-[#7fa519] transition-colors flex items-center gap-2"
        >
          <span className="icon-[material-symbols--add] h-5 w-5"></span>
          Agregar {activeTab === "country" ? "País" : "Ciudad"}
        </button>
      </div>

      {/* Lista de ubicaciones */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Orden
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {activeTab === "country" ? "País" : "Ciudad"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Porcentaje
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {(activeTab === "country" ? countries : cities).map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    #{item.orderIndex || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-lg mr-2">
                        {activeTab === "country" ? "🌍" : "🏙️"}
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {item.title}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.rise}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {item.isActive ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleOpenModal(item)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {(activeTab === "country" ? countries : cities).length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <span className="icon-[heroicons--map-pin-slash] h-16 w-16 mx-auto mb-4 opacity-50"></span>
              <p>
                No hay {activeTab === "country" ? "países" : "ciudades"}{" "}
                configurados
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">
                {editingItem
                  ? `Editar ${formData.type === "country" ? "País" : "Ciudad"}`
                  : `Nuevo ${formData.type === "country" ? "País" : "Ciudad"}`}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#96c121] focus:border-transparent"
                    required
                    disabled={editingItem}
                  >
                    <option value="country">🌍 País</option>
                    <option value="city">🏙️ Ciudad</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder={
                      formData.type === "country" ? "Ej: Ecuador" : "Ej: Cuenca"
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#96c121] focus:border-transparent"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Porcentaje (%) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.rise}
                      onChange={(e) =>
                        setFormData({ ...formData, rise: e.target.value })
                      }
                      placeholder="85.8"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#96c121] focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Orden
                    </label>
                    <input
                      type="number"
                      value={formData.orderIndex}
                      onChange={(e) =>
                        setFormData({ ...formData, orderIndex: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#96c121] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Color (opcional)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={formData.colors || "#3b82f6"}
                      onChange={(e) =>
                        setFormData({ ...formData, colors: e.target.value })
                      }
                      className="w-12 h-12 p-1 border border-gray-300 rounded-lg cursor-pointer hover:border-[#96c121] transition-colors"
                    />
                    <div className="flex-1">
                      <input
                        type="text"
                        value={formData.colors}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (
                            value === "" ||
                            /^#[0-9A-Fa-f]{0,6}$/.test(value)
                          ) {
                            setFormData({ ...formData, colors: value });
                          }
                        }}
                        placeholder="#3b82f6"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#96c121] focus:border-transparent font-mono"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Selecciona de la paleta o ingresa el código hexadecimal
                      </p>
                    </div>
                    {formData.colors && (
                      <div
                        className="w-10 h-10 rounded-lg border-2 border-gray-200 shadow-inner"
                        style={{ backgroundColor: formData.colors }}
                        title={`Vista previa: ${formData.colors}`}
                      />
                    )}
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-[#96c121] text-white px-4 py-2 rounded-lg hover:bg-[#7fa519] transition-colors"
                  >
                    {editingItem ? "Actualizar" : "Crear"}
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLocation;
