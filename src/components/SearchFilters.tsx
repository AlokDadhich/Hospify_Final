import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Stethoscope, X } from 'lucide-react';
import { SearchFilters as SearchFiltersType } from '../types';

interface SearchFiltersProps {
  filters: SearchFiltersType;
  onFiltersChange: (filters: SearchFiltersType) => void;
  onNearestHospital: () => void;
}

// Major Indian cities with their pin codes and coordinates
const INDIAN_CITIES = [
  { name: 'Mumbai', state: 'Maharashtra', pincode: '400001', lat: 19.0760, lng: 72.8777 },
  { name: 'Delhi', state: 'Delhi', pincode: '110001', lat: 28.7041, lng: 77.1025 },
  { name: 'Bangalore', state: 'Karnataka', pincode: '560001', lat: 12.9716, lng: 77.5946 },
  { name: 'Hyderabad', state: 'Telangana', pincode: '500001', lat: 17.3850, lng: 78.4867 },
  { name: 'Chennai', state: 'Tamil Nadu', pincode: '600001', lat: 13.0827, lng: 80.2707 },
  { name: 'Kolkata', state: 'West Bengal', pincode: '700001', lat: 22.5726, lng: 88.3639 },
  { name: 'Pune', state: 'Maharashtra', pincode: '411001', lat: 18.5204, lng: 73.8567 },
  { name: 'Ahmedabad', state: 'Gujarat', pincode: '380001', lat: 23.0225, lng: 72.5714 },
  { name: 'Jaipur', state: 'Rajasthan', pincode: '302001', lat: 26.9124, lng: 75.7873 },
  { name: 'Surat', state: 'Gujarat', pincode: '395001', lat: 21.1702, lng: 72.8311 },
  { name: 'Lucknow', state: 'Uttar Pradesh', pincode: '226001', lat: 26.8467, lng: 80.9462 },
  { name: 'Kanpur', state: 'Uttar Pradesh', pincode: '208001', lat: 26.4499, lng: 80.3319 },
  { name: 'Nagpur', state: 'Maharashtra', pincode: '440001', lat: 21.1458, lng: 79.0882 },
  { name: 'Indore', state: 'Madhya Pradesh', pincode: '452001', lat: 22.7196, lng: 75.8577 },
  { name: 'Thane', state: 'Maharashtra', pincode: '400601', lat: 19.2183, lng: 72.9781 },
  { name: 'Bhopal', state: 'Madhya Pradesh', pincode: '462001', lat: 23.2599, lng: 77.4126 },
  { name: 'Visakhapatnam', state: 'Andhra Pradesh', pincode: '530001', lat: 17.6868, lng: 83.2185 },
  { name: 'Pimpri-Chinchwad', state: 'Maharashtra', pincode: '411018', lat: 18.6298, lng: 73.8131 },
  { name: 'Patna', state: 'Bihar', pincode: '800001', lat: 25.5941, lng: 85.1376 },
  { name: 'Vadodara', state: 'Gujarat', pincode: '390001', lat: 22.3072, lng: 73.1812 },
  { name: 'Ghaziabad', state: 'Uttar Pradesh', pincode: '201001', lat: 28.6692, lng: 77.4538 },
  { name: 'Ludhiana', state: 'Punjab', pincode: '141001', lat: 30.9010, lng: 75.8573 },
  { name: 'Agra', state: 'Uttar Pradesh', pincode: '282001', lat: 27.1767, lng: 78.0081 },
  { name: 'Nashik', state: 'Maharashtra', pincode: '422001', lat: 19.9975, lng: 73.7898 },
  { name: 'Faridabad', state: 'Haryana', pincode: '121001', lat: 28.4089, lng: 77.3178 },
  { name: 'Meerut', state: 'Uttar Pradesh', pincode: '250001', lat: 28.9845, lng: 77.7064 },
  { name: 'Rajkot', state: 'Gujarat', pincode: '360001', lat: 22.3039, lng: 70.8022 },
  { name: 'Kalyan-Dombivli', state: 'Maharashtra', pincode: '421201', lat: 19.2403, lng: 73.1305 },
  { name: 'Vasai-Virar', state: 'Maharashtra', pincode: '401201', lat: 19.4912, lng: 72.8054 },
  { name: 'Varanasi', state: 'Uttar Pradesh', pincode: '221001', lat: 25.3176, lng: 82.9739 },
  { name: 'Srinagar', state: 'Jammu and Kashmir', pincode: '190001', lat: 34.0837, lng: 74.7973 },
  { name: 'Aurangabad', state: 'Maharashtra', pincode: '431001', lat: 19.8762, lng: 75.3433 },
  { name: 'Dhanbad', state: 'Jharkhand', pincode: '826001', lat: 23.7957, lng: 86.4304 },
  { name: 'Amritsar', state: 'Punjab', pincode: '143001', lat: 31.6340, lng: 74.8723 },
  { name: 'Navi Mumbai', state: 'Maharashtra', pincode: '400614', lat: 19.0330, lng: 73.0297 },
  { name: 'Allahabad', state: 'Uttar Pradesh', pincode: '211001', lat: 25.4358, lng: 81.8463 },
  { name: 'Ranchi', state: 'Jharkhand', pincode: '834001', lat: 23.3441, lng: 85.3096 },
  { name: 'Howrah', state: 'West Bengal', pincode: '711101', lat: 22.5958, lng: 88.2636 },
  { name: 'Coimbatore', state: 'Tamil Nadu', pincode: '641001', lat: 11.0168, lng: 76.9558 },
  { name: 'Jabalpur', state: 'Madhya Pradesh', pincode: '482001', lat: 23.1815, lng: 79.9864 },
  { name: 'Gwalior', state: 'Madhya Pradesh', pincode: '474001', lat: 26.2183, lng: 78.1828 },
  { name: 'Vijayawada', state: 'Andhra Pradesh', pincode: '520001', lat: 16.5062, lng: 80.6480 },
  { name: 'Jodhpur', state: 'Rajasthan', pincode: '342001', lat: 26.2389, lng: 73.0243 },
  { name: 'Madurai', state: 'Tamil Nadu', pincode: '625001', lat: 9.9252, lng: 78.1198 },
  { name: 'Raipur', state: 'Chhattisgarh', pincode: '492001', lat: 21.2514, lng: 81.6296 },
  { name: 'Kota', state: 'Rajasthan', pincode: '324001', lat: 25.2138, lng: 75.8648 },
  { name: 'Chandigarh', state: 'Chandigarh', pincode: '160001', lat: 30.7333, lng: 76.7794 },
  { name: 'Gurgaon', state: 'Haryana', pincode: '122001', lat: 28.4595, lng: 77.0266 },
  { name: 'Solapur', state: 'Maharashtra', pincode: '413001', lat: 17.6599, lng: 75.9064 },
  { name: 'Hubli-Dharwad', state: 'Karnataka', pincode: '580001', lat: 15.3647, lng: 75.1240 },
  { name: 'Bareilly', state: 'Uttar Pradesh', pincode: '243001', lat: 28.3670, lng: 79.4304 },
  { name: 'Moradabad', state: 'Uttar Pradesh', pincode: '244001', lat: 28.8386, lng: 78.7733 },
  { name: 'Mysore', state: 'Karnataka', pincode: '570001', lat: 12.2958, lng: 76.6394 },
  { name: 'Gurgaon', state: 'Haryana', pincode: '122001', lat: 28.4595, lng: 77.0266 }
];

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  onFiltersChange,
  onNearestHospital
}) => {
  const [cityInput, setCityInput] = useState(filters.city);
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);
  const [filteredCities, setFilteredCities] = useState(INDIAN_CITIES);

  const resourceTypes = [
    { value: 'all', label: 'All Resources' },
    { value: 'icu', label: 'ICU Beds' },
    { value: 'general', label: 'General Beds' },
    { value: 'oxygen', label: 'Oxygen Beds' },
    { value: 'ventilator', label: 'Ventilators' },
    { value: 'ambulance', label: 'Ambulances' }
  ];

  // Filter cities based on input
  useEffect(() => {
    if (cityInput.length > 0) {
      const filtered = INDIAN_CITIES.filter(city =>
        city.name.toLowerCase().includes(cityInput.toLowerCase()) ||
        city.state.toLowerCase().includes(cityInput.toLowerCase()) ||
        city.pincode.includes(cityInput)
      );
      setFilteredCities(filtered);
    } else {
      setFilteredCities(INDIAN_CITIES);
    }
  }, [cityInput]);

  const handleCitySelect = (city: typeof INDIAN_CITIES[0]) => {
    setCityInput(city.name);
    setShowCitySuggestions(false);
    onFiltersChange({ 
      ...filters, 
      city: city.name,
      pincode: city.pincode
    });
  };

  const handleCityInputChange = (value: string) => {
    setCityInput(value);
    setShowCitySuggestions(true);
    
    // If user types a city name that matches exactly, auto-fill pincode
    const exactMatch = INDIAN_CITIES.find(city => 
      city.name.toLowerCase() === value.toLowerCase()
    );
    
    if (exactMatch) {
      onFiltersChange({ 
        ...filters, 
        city: value,
        pincode: exactMatch.pincode
      });
    } else {
      onFiltersChange({ ...filters, city: value });
    }
  };

  const handlePincodeChange = (value: string) => {
    onFiltersChange({ ...filters, pincode: value });
    
    // If user types a pincode that matches a city, auto-fill city
    const matchingCity = INDIAN_CITIES.find(city => city.pincode === value);
    if (matchingCity && cityInput !== matchingCity.name) {
      setCityInput(matchingCity.name);
      onFiltersChange({ 
        ...filters, 
        city: matchingCity.name,
        pincode: value
      });
    }
  };

  const clearSearch = () => {
    setCityInput('');
    setShowCitySuggestions(false);
    onFiltersChange({ 
      ...filters, 
      city: '',
      pincode: ''
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* City Search with Autocomplete */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Search className="inline h-4 w-4 mr-1" />
            City
          </label>
          <div className="relative">
            <input
              type="text"
              value={cityInput}
              onChange={(e) => handleCityInputChange(e.target.value)}
              onFocus={() => setShowCitySuggestions(true)}
              placeholder="Search Indian cities..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
            />
            {cityInput && (
              <button
                onClick={clearSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          
          {/* City Suggestions Dropdown */}
          {showCitySuggestions && filteredCities.length > 0 && (
            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {filteredCities.slice(0, 10).map((city, index) => (
                <div
                  key={index}
                  onClick={() => handleCitySelect(city)}
                  className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium text-gray-900">{city.name}</div>
                      <div className="text-sm text-gray-600">{city.state}</div>
                    </div>
                    <div className="text-sm text-blue-600 font-mono">{city.pincode}</div>
                  </div>
                </div>
              ))}
              {filteredCities.length > 10 && (
                <div className="px-4 py-2 text-sm text-gray-500 text-center border-t">
                  {filteredCities.length - 10} more cities...
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* PIN Code */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="inline h-4 w-4 mr-1" />
            PIN Code
          </label>
          <input
            type="text"
            value={filters.pincode}
            onChange={(e) => handlePincodeChange(e.target.value)}
            placeholder="Enter PIN code"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            maxLength={6}
          />
        </div>
        
        {/* Resource Type */}
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
        
        {/* Search Radius */}
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
        
        <div className="flex space-x-3">
          {(filters.city || filters.pincode) && (
            <button
              onClick={clearSearch}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors duration-200"
            >
              <X className="h-4 w-4" />
              <span>Clear</span>
            </button>
          )}
          
          <button
            onClick={onNearestHospital}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors duration-200"
          >
            <MapPin className="h-4 w-4" />
            <span>Find Nearest Hospital</span>
          </button>
        </div>
      </div>

      {/* Quick City Buttons */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600 mb-3">Quick search for major cities:</p>
        <div className="flex flex-wrap gap-2">
          {['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad'].map((cityName) => {
            const city = INDIAN_CITIES.find(c => c.name === cityName);
            return (
              <button
                key={cityName}
                onClick={() => city && handleCitySelect(city)}
                className={`px-3 py-1 text-sm rounded-full border transition-colors duration-200 ${
                  filters.city === cityName
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-300'
                }`}
              >
                {cityName}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};