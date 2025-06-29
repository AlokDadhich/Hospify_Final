import React from 'react';
import { Phone, MapPin, Clock, CheckCircle, AlertCircle, Bed, Stethoscope, Truck } from 'lucide-react';
import { HospitalProfile, BedAvailability } from '../types/hospital';

interface HospitalCardProps {
  hospital: HospitalProfile;
  availability?: BedAvailability;
  distance?: number;
  onClick?: () => void;
}

export const HospitalCard: React.FC<HospitalCardProps> = ({ hospital, availability, distance, onClick }) => {
  const getAvailabilityColor = (available: number, total: number) => {
    if (total === 0) return 'text-gray-600';
    const percentage = (available / total) * 100;
    if (percentage > 20) return 'text-green-600';
    if (percentage > 10) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getAvailabilityBg = (available: number, total: number) => {
    if (total === 0) return 'bg-gray-100';
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
    <div 
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100 cursor-pointer"
      onClick={onClick}
    >
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
          {availability && (
            <div className="flex items-center text-gray-500 text-xs mb-1">
              <Clock className="h-3 w-3 mr-1" />
              <span>Updated {formatLastUpdated(availability.lastUpdated)}</span>
            </div>
          )}
        </div>
      </div>

      {availability ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div className={`p-3 rounded-lg ${getAvailabilityBg(availability.icuBeds.available, availability.icuBeds.total)}`}>
            <div className="flex items-center justify-between">
              <Bed className="h-5 w-5 text-gray-600" />
              <span className={`font-bold ${getAvailabilityColor(availability.icuBeds.available, availability.icuBeds.total)}`}>
                {availability.icuBeds.available}
              </span>
            </div>
            <div className="text-xs text-gray-600 mt-1">ICU Beds</div>
            <div className="text-xs text-gray-500">of {availability.icuBeds.total}</div>
          </div>

          <div className={`p-3 rounded-lg ${getAvailabilityBg(availability.generalBeds.available, availability.generalBeds.total)}`}>
            <div className="flex items-center justify-between">
              <Bed className="h-5 w-5 text-gray-600" />
              <span className={`font-bold ${getAvailabilityColor(availability.generalBeds.available, availability.generalBeds.total)}`}>
                {availability.generalBeds.available}
              </span>
            </div>
            <div className="text-xs text-gray-600 mt-1">General Beds</div>
            <div className="text-xs text-gray-500">of {availability.generalBeds.total}</div>
          </div>

          <div className={`p-3 rounded-lg ${getAvailabilityBg(availability.oxygenBeds.available, availability.oxygenBeds.total)}`}>
            <div className="flex items-center justify-between">
              <Stethoscope className="h-5 w-5 text-gray-600" />
              <span className={`font-bold ${getAvailabilityColor(availability.oxygenBeds.available, availability.oxygenBeds.total)}`}>
                {availability.oxygenBeds.available}
              </span>
            </div>
            <div className="text-xs text-gray-600 mt-1">Oxygen Beds</div>
            <div className="text-xs text-gray-500">of {availability.oxygenBeds.total}</div>
          </div>

          <div className={`p-3 rounded-lg ${getAvailabilityBg(availability.ventilators.available, availability.ventilators.total)}`}>
            <div className="flex items-center justify-between">
              <AlertCircle className="h-5 w-5 text-gray-600" />
              <span className={`font-bold ${getAvailabilityColor(availability.ventilators.available, availability.ventilators.total)}`}>
                {availability.ventilators.available}
              </span>
            </div>
            <div className="text-xs text-gray-600 mt-1">Ventilators</div>
            <div className="text-xs text-gray-500">of {availability.ventilators.total}</div>
          </div>

          <div className={`p-3 rounded-lg ${getAvailabilityBg(availability.ambulances.available, availability.ambulances.total)}`}>
            <div className="flex items-center justify-between">
              <Truck className="h-5 w-5 text-gray-600" />
              <span className={`font-bold ${getAvailabilityColor(availability.ambulances.available, availability.ambulances.total)}`}>
                {availability.ambulances.available}
              </span>
            </div>
            <div className="text-xs text-gray-600 mt-1">Ambulances</div>
            <div className="text-xs text-gray-500">of {availability.ambulances.total}</div>
          </div>
        </div>
      ) : (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg text-center">
          <AlertCircle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-600 text-sm">Availability data not available</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={`tel:${hospital.phone}`}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <Phone className="h-4 w-4" />
          <span>Call Hospital</span>
        </a>
        <a
          href={`https://maps.google.com/?q=${hospital.location.latitude},${hospital.location.longitude}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <MapPin className="h-4 w-4" />
          <span>Get Directions</span>
        </a>
      </div>
    </div>
  );
};