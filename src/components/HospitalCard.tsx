import React from 'react';
import { Phone, MapPin, Clock, CheckCircle, AlertCircle, Bed, Stethoscope, Truck } from 'lucide-react';
import { Hospital } from '../types';

interface HospitalCardProps {
  hospital: Hospital;
  distance?: number;
}

export const HospitalCard: React.FC<HospitalCardProps> = ({ hospital, distance }) => {
  const getAvailabilityColor = (available: number, total: number) => {
    const percentage = (available / total) * 100;
    if (percentage > 20) return 'text-green-600';
    if (percentage > 10) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getAvailabilityBg = (available: number, total: number) => {
    const percentage = (available / total) * 100;
    if (percentage > 20) return 'bg-green-100';
    if (percentage > 10) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const formatLastUpdated = (timestamp: string) => {
    const now = new Date();
    const updated = new Date(timestamp);
    const diffMinutes = Math.floor((now.getTime() - updated.getTime()) / (1000 * 60));
    
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}h ago`;
    return `${Math.floor(diffMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{hospital.name}</h3>
            {hospital.isVerified && (
              <CheckCircle className="h-5 w-5 text-green-600" />
            )}
          </div>
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{hospital.address}</span>
          </div>
          {distance && (
            <div className="text-sm text-blue-600 font-medium">
              {distance.toFixed(1)} km away
            </div>
          )}
        </div>
        <div className="text-right">
          <div className="flex items-center text-gray-500 text-xs mb-1">
            <Clock className="h-3 w-3 mr-1" />
            <span>Updated {formatLastUpdated(hospital.lastUpdated)}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <div className={`p-3 rounded-lg ${getAvailabilityBg(hospital.resources.icuBeds.available, hospital.resources.icuBeds.total)}`}>
          <div className="flex items-center justify-between">
            <Bed className="h-5 w-5 text-gray-600" />
            <span className={`font-bold ${getAvailabilityColor(hospital.resources.icuBeds.available, hospital.resources.icuBeds.total)}`}>
              {hospital.resources.icuBeds.available}
            </span>
          </div>
          <div className="text-xs text-gray-600 mt-1">ICU Beds</div>
          <div className="text-xs text-gray-500">of {hospital.resources.icuBeds.total}</div>
        </div>

        <div className={`p-3 rounded-lg ${getAvailabilityBg(hospital.resources.generalBeds.available, hospital.resources.generalBeds.total)}`}>
          <div className="flex items-center justify-between">
            <Bed className="h-5 w-5 text-gray-600" />
            <span className={`font-bold ${getAvailabilityColor(hospital.resources.generalBeds.available, hospital.resources.generalBeds.total)}`}>
              {hospital.resources.generalBeds.available}
            </span>
          </div>
          <div className="text-xs text-gray-600 mt-1">General Beds</div>
          <div className="text-xs text-gray-500">of {hospital.resources.generalBeds.total}</div>
        </div>

        <div className={`p-3 rounded-lg ${getAvailabilityBg(hospital.resources.oxygenBeds.available, hospital.resources.oxygenBeds.total)}`}>
          <div className="flex items-center justify-between">
            <Stethoscope className="h-5 w-5 text-gray-600" />
            <span className={`font-bold ${getAvailabilityColor(hospital.resources.oxygenBeds.available, hospital.resources.oxygenBeds.total)}`}>
              {hospital.resources.oxygenBeds.available}
            </span>
          </div>
          <div className="text-xs text-gray-600 mt-1">Oxygen Beds</div>
          <div className="text-xs text-gray-500">of {hospital.resources.oxygenBeds.total}</div>
        </div>

        <div className={`p-3 rounded-lg ${getAvailabilityBg(hospital.resources.ventilators.available, hospital.resources.ventilators.total)}`}>
          <div className="flex items-center justify-between">
            <AlertCircle className="h-5 w-5 text-gray-600" />
            <span className={`font-bold ${getAvailabilityColor(hospital.resources.ventilators.available, hospital.resources.ventilators.total)}`}>
              {hospital.resources.ventilators.available}
            </span>
          </div>
          <div className="text-xs text-gray-600 mt-1">Ventilators</div>
          <div className="text-xs text-gray-500">of {hospital.resources.ventilators.total}</div>
        </div>

        <div className={`p-3 rounded-lg ${getAvailabilityBg(hospital.resources.ambulances.available, hospital.resources.ambulances.total)}`}>
          <div className="flex items-center justify-between">
            <Truck className="h-5 w-5 text-gray-600" />
            <span className={`font-bold ${getAvailabilityColor(hospital.resources.ambulances.available, hospital.resources.ambulances.total)}`}>
              {hospital.resources.ambulances.available}
            </span>
          </div>
          <div className="text-xs text-gray-600 mt-1">Ambulances</div>
          <div className="text-xs text-gray-500">of {hospital.resources.ambulances.total}</div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={`tel:${hospital.phone}`}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors duration-200"
        >
          <Phone className="h-4 w-4" />
          <span>Call Hospital</span>
        </a>
        <a
          href={`https://maps.google.com/?q=${hospital.location.latitude},${hospital.location.longitude}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors duration-200"
        >
          <MapPin className="h-4 w-4" />
          <span>Get Directions</span>
        </a>
      </div>
    </div>
  );
};