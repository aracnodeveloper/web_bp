import React, { useState, useEffect } from 'react';
import { useAge } from '../../../hooks/useMetrics';

const AdminAge = () => {
    const { data, loading, updateData } = useAge();
    const [formData, setFormData] = useState({
        youngs: 0,        // 18-24
        youngAdl: 0,      // 25-34
        adults: 0,        // 35-44
        adultsOld: 0,     // 45-54
        olds: 0,          // 55-64
        elders: 0,        // 65+
        isActive: true,
    });

    const ageRanges = [
        { key: 'youngs', label: '18-24 años', emoji: '🧑', color: '#60a5fa' },
        { key: 'youngAdl', label: '25-34 años', emoji: '👨', color: '#3b82f6' },
        { key: 'adults', label: '35-44 años', emoji: '👨‍💼', color: '#2563eb' },
        { key: 'adultsOld', label: '45-54 años', emoji: '👨‍🦱', color: '#1d4ed8' },
        { key: 'olds', label: '55-64 años', emoji: '👴', color: '#1e40af' },
        { key: 'elders', label: '65+ años', emoji: '🧓', color: '#1e3a8a' },
    ];

    useEffect(() => {
        if (data) {
            setFormData({
                youngs: data.youngs,
                youngAdl: data.youngAdl || 0,
                adults: data.adults,
                adultsOld: data.adultsOld,
                olds: data.olds,
                elders: data.elders,
                isActive: data.isActive,
            });
        }
    }, [data]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!data || !data.id) {
            alert('No hay datos de edad para actualizar. Debe crear el registro inicial desde la base de datos.');
            return;
        }

        try {
            const dataToSend = {
                youngs: parseFloat(formData.youngs),
                youngAdl: parseFloat(formData.youngAdl),
                adults: parseFloat(formData.adults),
                adultsOld: parseFloat(formData.adultsOld),
                olds: parseFloat(formData.olds),
                elders: parseFloat(formData.elders),
                isActive: formData.isActive,
            };

            await updateData(data.id, dataToSend);
            alert('Datos de edad actualizados correctamente');
        } catch (error) {
            alert('Error al actualizar');
        }
    };

    const total = Object.keys(formData)
        .filter(key => key !== 'isActive')
        .reduce((sum, key) => sum + parseFloat(formData[key] || 0), 0);

    const getPercentage = (value) => {
        return total > 0 ? ((parseFloat(value) / total) * 100).toFixed(1) : 0;
    };

    if (loading) {
        return <div className="text-center py-8">Cargando...</div>;
    }

    return (
        <div>
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Distribución por Edad</h2>
                <p className="text-sm text-gray-500 mt-1">
                    Actualiza los porcentajes de distribución de edad de tu audiencia
                </p>
            </div>

            {!data && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-2">
                        <span className="icon-[material-symbols--warning] h-5 w-5 text-yellow-600"></span>
                        <p className="text-sm text-yellow-800">
                            No hay datos de edad registrados. Debe crear el registro inicial desde la base de datos.
                        </p>
                    </div>
                </div>
            )}

            {/* Vista previa */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Vista Previa de Distribución</h3>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {ageRanges.map((range) => {
                        const percentage = getPercentage(formData[range.key]);
                        return (
                            <div
                                key={range.key}
                                className="p-3 rounded-lg border-2"
                                style={{ borderColor: range.color }}
                            >
                                <div className="flex items-center mb-2">
                                    <span className="mr-2 text-xl">{range.emoji}</span>
                                    <span className="font-medium text-sm">{range.label}</span>
                                </div>
                                <div className="flex justify-between items-center mb-1">
                                    <div className="text-lg font-semibold" style={{ color: range.color }}>
                                        {percentage}%
                                    </div>
                                </div>
                                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-full rounded-full transition-all duration-500"
                                        style={{
                                            width: `${percentage}%`,
                                            backgroundColor: range.color,
                                        }}
                                    ></div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {total !== 100 && total > 0 && (
                    <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <p className="text-sm text-yellow-800">
                            ⚠️ La suma total es {total.toFixed(1)}%. Se recomienda que sume 100%.
                        </p>
                    </div>
                )}
            </div>

            {/* Formulario */}
            <div className="bg-white rounded-xl shadow-md p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {ageRanges.map((range) => (
                            <div key={range.key}>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {range.emoji} {range.label} (%) *
                                </label>
                                <input
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="100"
                                    value={formData[range.key]}
                                    onChange={(e) => setFormData({ ...formData, [range.key]: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#96c121] focus:border-transparent"
                                    required
                                />
                            </div>
                        ))}
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-sm text-blue-800">
                            💡 <strong>Suma total:</strong> {total.toFixed(1)}%
                        </p>
                    </div>



                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={!data}
                            className="w-full bg-[#96c121] text-white px-4 py-2 rounded-lg hover:bg-[#7fa519] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            Actualizar Datos de Edad
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminAge;