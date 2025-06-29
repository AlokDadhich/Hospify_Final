import React from 'react';
import { Search, Filter, MapPin, Stethoscope } from 'lucide-react';
import { SearchFilters as SearchFiltersType } from '../types';

interface SearchFiltersProps {
  filters: SearchFiltersType;
  onFiltersChange: (filters: SearchFiltersType) => void;
  onNearestHospital: () => void;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  onFiltersChange,
  onNearestHospital
}) => {
  const resourceTypes = [
    { value: 'all', label: 'All Resources' },
    { value: 'icu', label: 'ICU Beds' },
    { value: 'general', label: 'General Beds' },
    { value: 'oxygen', label: 'Oxygen Beds' },
    { value: 'ventilator', label: 'Ventilators' },
    { value: 'ambulance', label: 'Ambulances' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Search className="inline h-4 w-4 mr-1" />
            City
          </label>
          <input
            type="text"
            value={filters.city}
            onChange={(e) => onFiltersChange({ ...filters, city: e.target.value })}
            placeholder="Enter city name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="inline h-4 w-4 mr-1" />
            PIN Code
          </label>
          <input
            type="text"
            value={filters.pincode}
            onChange={(e) => onFiltersChange({ ...filters, pincode: e.target.value })}
            placeholder="Enter PIN code"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Stethoscope className="inline h-4 w-4 mr-1" />
            Resource Type
          </label>
          <select
            value={filters.resourceType}
            onChange={(e) => onFiltersChange({ ...filters, resourceType: e.target.value as any })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {resourceTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Filter className="inline h-4 w-4 mr-1" />
            Search Radius (km)
          </label>
          <select
            value={filters.radius}
            onChange={(e) => onFiltersChange({ ...filters, radius: Number(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value={5}>5 km</option>
            <option value={10}>10 km</option>
            <option value={25}>25 km</option>
            <option value={50}>50 km</option>
            <option value={100}>100 km</option>
          </select>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="availabilityOnly"
            checked={filters.availabilityOnly}
            onChange={(e) => onFiltersChange({ ...filters, availabilityOnly: e.target.checked })}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="availabilityOnly" className="ml-2 text-sm text-gray-700">
            Show only hospitals with available resources
          </label>
        </div>
        
        <button
          onClick={onNearestHospital}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors duration-200"
        >
          <MapPin className="h-4 w-4" />
          <span>Find Nearest Hospital</span>
        </button>
      </div>
    </div>
  );
};