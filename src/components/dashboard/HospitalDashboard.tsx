import React, { useState, useEffect } from 'react';
import { 
  Bed, 
  Activity, 
  Truck, 
  Users, 
  Clock, 
  TrendingUp, 
  AlertCircle,
  Save,
  RefreshCw,
  BarChart3
} from 'lucide-react';
import { BedAvailability, HospitalProfile } from '../../types/hospital';
import { HospitalService } from '../../services/hospitalService';
import { AuthService } from '../../services/authService';

interface HospitalDashboardProps {
  hospitalId: string;
  onDataUpdate?: (availability: BedAvailability) => void;
}

export const HospitalDashboard: React.FC<HospitalDashboardProps> = ({ hospitalId, onDataUpdate }) => {
  const [availability, setAvailability] = useState<BedAvailability | null>(null);
  const [hospital, setHospital] = useState<HospitalProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const [formData, setFormData] = useState({
    icuBeds: { total: 0, available: 0 },
    generalBeds: { total: 0, available: 0 },
    oxygenBeds: { total: 0, available: 0 },
    ventilators: { total: 0, available: 0 },
    ambulances: { total: 0, available: 0 }
  });

  useEffect(() => {
    loadData();
  }, [hospitalId]);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // For demo purposes, use sample data
      const sampleHospital: HospitalProfile = {
        id: hospitalId,
        name: 'Sample Hospital',
        address: '123 Medical Center Drive, Pune, Maharashtra',
        city: 'Pune',
        state: 'Maharashtra',
        pincode: '411001',
        phone: '+91-20-1234-5678',
        email: 'admin@samplehospital.com',
        registrationNumber: 'MH/12345/2023',
        location: { latitude: 18.5204, longitude: 73.8567 },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isVerified: true,
        adminUserId: 'admin1'
      };

      const sampleAvailability: BedAvailability = {
        id: `availability_${hospitalId}`,
        hospitalId,
        icuBeds: { total: 50, available: 15, occupied: 35 },
        generalBeds: { total: 200, available: 45, occupied: 155 },
        oxygenBeds: { total: 80, available: 20, occupied: 60 },
        ventilators: { total: 25, available: 8, occupied: 17 },
        ambulances: { total: 8, available: 3, onDuty: 5 },
        lastUpdated: new Date().toISOString(),
        updatedBy: 'admin'
      };

      setHospital(sampleHospital);
      setAvailability(sampleAvailability);
      setFormData({
        icuBeds: sampleAvailability.icuBeds,
        generalBeds: sampleAvailability.generalBeds,
        oxygenBeds: sampleAvailability.oxygenBeds,
        ventilators: sampleAvailability.ventilators,
        ambulances: sampleAvailability.ambulances
      });
      setLastUpdated(new Date(sampleAvailability.lastUpdated));
      
    } catch (error) {
      setError('Failed to load hospital data');
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError('');
      
      const user = AuthService.getCurrentUser();
      if (!user) {
        setError('User not authenticated');
        return;
      }

      const updateData: BedAvailability = {
        id: `availability_${hospitalId}`,
        hospitalId,
        icuBeds: {
          ...formData.icuBeds,
          occupied: formData.icuBeds.total - formData.icuBeds.available
        },
        generalBeds: {
          ...formData.generalBeds,
          occupied: formData.generalBeds.total - formData.generalBeds.available
        },
        oxygenBeds: {
          ...formData.oxygenBeds,
          occupied: formData.oxygenBeds.total - formData.oxygenBeds.available
        },
        ventilators: {
          ...formData.ventilators,
          occupied: formData.ventilators.total - formData.ventilators.available
        },
        ambulances: {
          ...formData.ambulances,
          onDuty: formData.ambulances.total - formData.ambulances.available
        },
        lastUpdated: new Date().toISOString(),
        updatedBy: user.uid
      };

      // Update local state
      setAvailability(updateData);
      setLastUpdated(new Date());
      
      // Call the callback to update parent component
      if (onDataUpdate) {
        onDataUpdate(updateData);
      }
      
      setSuccess('Data updated successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
      
    } catch (error) {
      setError('Failed to update data');
      console.error('Error updating data:', error);
    } finally {
      setSaving(false);
    }
  };

  const updateField = (category: string, field: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [field]: Math.max(0, value)
      }
    }));
  };

  const getOccupancyRate = (available: number, total: number) => {
    if (total === 0) return 0;
    return ((total - available) / total * 100).toFixed(1);
  };

  const getAvailabilityColor = (available: number, total: number) => {
    const rate = available / total;
    if (rate > 0.2) return 'text-green-600';
    if (rate > 0.1) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {hospital?.name || 'Hospital Dashboard'}
        </h1>
        <div className="flex items-center justify-between">
          <p className="text-gray-600">Manage your hospital's resource availability</p>
          {lastUpdated && (
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              Last updated: {lastUpdated.toLocaleString()}
            </div>
          )}
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
          <p className="text-green-800">{success}</p>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {[
          { 
            title: 'ICU Beds', 
            available: formData.icuBeds.available, 
            total: formData.icuBeds.total, 
            icon: Bed, 
            color: 'bg-red-50 border-red-200' 
          },
          { 
            title: 'General Beds', 
            available: formData.generalBeds.available, 
            total: formData.generalBeds.total, 
            icon: Bed, 
            color: 'bg-blue-50 border-blue-200' 
          },
          { 
            title: 'Oxygen Beds', 
            available: formData.oxygenBeds.available, 
            total: formData.oxygenBeds.total, 
            icon: Activity, 
            color: 'bg-green-50 border-green-200' 
          },
          { 
            title: 'Ventilators', 
            available: formData.ventilators.available, 
            total: formData.ventilators.total, 
            icon: Activity, 
            color: 'bg-purple-50 border-purple-200' 
          },
          { 
            title: 'Ambulances', 
            available: formData.ambulances.available, 
            total: formData.ambulances.total, 
            icon: Truck, 
            color: 'bg-yellow-50 border-yellow-200' 
          }
        ].map((stat, index) => (
          <div key={index} className={`${stat.color} border rounded-xl p-4`}>
            <div className="flex items-center justify-between mb-2">
              <stat.icon className="h-6 w-6 text-gray-600" />
              <span className={`text-2xl font-bold ${getAvailabilityColor(stat.available, stat.total)}`}>
                {stat.available}
              </span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{stat.title}</h3>
            <p className="text-sm text-gray-600">
              of {stat.total} total ({getOccupancyRate(stat.available, stat.total)}% occupied)
            </p>
          </div>
        ))}
      </div>

      {/* Resource Management Form */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Update Resource Availability</h2>
          <div className="flex space-x-3">
            <button
              onClick={loadData}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              <Save className="h-4 w-4" />
              <span>{saving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ICU Beds */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Bed className="h-5 w-5 mr-2 text-red-600" />
              ICU Beds
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Total ICU Beds</label>
                <input
                  type="number"
                  min="0"
                  value={formData.icuBeds.total}
                  onChange={(e) => updateField('icuBeds', 'total', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Available ICU Beds</label>
                <input
                  type="number"
                  min="0"
                  max={formData.icuBeds.total}
                  value={formData.icuBeds.available}
                  onChange={(e) => updateField('icuBeds', 'available', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* General Beds */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Bed className="h-5 w-5 mr-2 text-blue-600" />
              General Beds
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Total General Beds</label>
                <input
                  type="number"
                  min="0"
                  value={formData.generalBeds.total}
                  onChange={(e) => updateField('generalBeds', 'total', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Available General Beds</label>
                <input
                  type="number"
                  min="0"
                  max={formData.generalBeds.total}
                  value={formData.generalBeds.available}
                  onChange={(e) => updateField('generalBeds', 'available', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Oxygen Beds */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Activity className="h-5 w-5 mr-2 text-green-600" />
              Oxygen Beds
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Total Oxygen Beds</label>
                <input
                  type="number"
                  min="0"
                  value={formData.oxygenBeds.total}
                  onChange={(e) => updateField('oxygenBeds', 'total', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Available Oxygen Beds</label>
                <input
                  type="number"
                  min="0"
                  max={formData.oxygenBeds.total}
                  value={formData.oxygenBeds.available}
                  onChange={(e) => updateField('oxygenBeds', 'available', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Ventilators */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Activity className="h-5 w-5 mr-2 text-purple-600" />
              Ventilators
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Total Ventilators</label>
                <input
                  type="number"
                  min="0"
                  value={formData.ventilators.total}
                  onChange={(e) => updateField('ventilators', 'total', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Available Ventilators</label>
                <input
                  type="number"
                  min="0"
                  max={formData.ventilators.total}
                  value={formData.ventilators.available}
                  onChange={(e) => updateField('ventilators', 'available', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Ambulances */}
          <div className="space-y-4 lg:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Truck className="h-5 w-5 mr-2 text-yellow-600" />
              Ambulances
            </h3>
            <div className="grid grid-cols-2 gap-4 max-w-md">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Total Ambulances</label>
                <input
                  type="number"
                  min="0"
                  value={formData.ambulances.total}
                  onChange={(e) => updateField('ambulances', 'total', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Available Ambulances</label>
                <input
                  type="number"
                  min="0"
                  max={formData.ambulances.total}
                  value={formData.ambulances.available}
                  onChange={(e) => updateField('ambulances', 'available', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
            <TrendingUp className="h-5 w-5" />
            <span>View Analytics</span>
          </button>
          <button className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
            <BarChart3 className="h-5 w-5" />
            <span>Generate Report</span>
          </button>
          <button className="flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
            <Users className="h-5 w-5" />
            <span>Manage Staff</span>
          </button>
        </div>
      </div>
    </div>
  );
};