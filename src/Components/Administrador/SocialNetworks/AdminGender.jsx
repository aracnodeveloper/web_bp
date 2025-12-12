import React, { useState, useEffect } from 'react';
import { useGender } from '../../../hooks/useMetrics';

const AdminGender = () => {
    const { data, loading, updateData } = useGender();
    const [formData, setFormData] = useState({
        male: 0,
        female: 0,
        isActive: true,
    });

    useEffect(() => {
        if (data) {
            setFormData({
                male: data.male,
                female: data.female,
                isActive: data.isActive,
            });
        }
    }, [data]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!data || !data.id) {
            alert('No hay datos de género para actualizar. Debe crear el registro inicial desde la base de datos.');
            return;
        }

        try {
            const dataToSend = {
                male: parseFloat(formData.male),
                female: parseFloat(formData.female),
                isActive: formData.isActive,
            };

            await updateData(data.id, dataToSend);
            alert('Datos de género actualizados correctamente');
        } catch (error) {
            alert('Error al actualizar');
        }
    };

    const total = parseFloat(formData.male) + parseFloat(formData.female);
    const malePercent = total > 0 ? ((parseFloat(formData.male) / total) * 100).toFixed(1) : 0;
    const femalePercent = total > 0 ? ((parseFloat(formData.female) / total) * 100).toFixed(1) : 0;

    if (loading) {
        return <div className="text-center py-8">Cargando...</div>;
    }

    return (
        <div>
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Distribución por Género</h2>
                <p className="text-sm text-gray-500 mt-1">
                    Actualiza los porcentajes de distribución de género de tu audiencia
                </p>
            </div>

            {!data && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-2">
                        <span className="icon-[material-symbols--warning] h-5 w-5 text-yellow-600"></span>
                        <p className="text-sm text-yellow-800">
                            No hay datos de género registrados. Debe crear el registro inicial desde la base de datos.
                        </p>
                    </div>
                </div>
            )}

            {/* Vista previa */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Vista Previa</h3>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-3xl">👨</span>
                            <span className="font-medium">Hombre</span>
                        </div>
                        <div className="text-3xl font-bold text-blue-600">{malePercent}%</div>
                    </div>

                    <div className="bg-pink-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-3xl">👩</span>
                            <span className="font-medium">Mujer</span>
                        </div>
                        <div className="text-3xl font-bold text-pink-600">{femalePercent}%</div>
                    </div>
                </div>

                {/* Barra de progreso */}
                <div className="flex h-8 rounded-lg overflow-hidden">
                    <div
                        className="bg-blue-500 flex items-center justify-center text-white text-sm font-semibold transition-all duration-500"
                        style={{ width: `${malePercent}%` }}
                    >
                        {malePercent > 15 && `${malePercent}%`}
                    </div>
                    <div
                        className="bg-pink-500 flex items-center justify-center text-white text-sm font-semibold transition-all duration-500"
                        style={{ width: `${femalePercent}%` }}
                    >
                        {femalePercent > 15 && `${femalePercent}%`}
                    </div>
                </div>
            </div>

            {/* Formulario */}
            <div className="bg-white rounded-xl shadow-md p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                👨 Hombre (%) *
                            </label>
                            <input
                                type="number"
                                step="0.1"
                                min="0"
                                max="100"
                                value={formData.male}
                                onChange={(e) => setFormData({ ...formData, male: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#96c121] focus:border-transparent"
                                required
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Porcentaje de audiencia masculina
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                👩 Mujer (%) *
                            </label>
                            <input
                                type="number"
                                step="0.1"
                                min="0"
                                max="100"
                                value={formData.female}
                                onChange={(e) => setFormData({ ...formData, female: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#96c121] focus:border-transparent"
                                required
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Porcentaje de audiencia femenina
                            </p>
                        </div>
                    </div>

                    {total !== 100 && total > 0 && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                            <p className="text-sm text-yellow-800">
                                ⚠️ La suma total es {total.toFixed(1)}%. Se recomienda que sume 100%.
                            </p>
                        </div>
                    )}


                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={!data}
                            className="w-full bg-[#96c121] text-white px-4 py-2 rounded-lg hover:bg-[#7fa519] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            Actualizar Datos de Género
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminGender;