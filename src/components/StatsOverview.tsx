import React from 'react';
import { Bed, Activity, Truck, AlertCircle } from 'lucide-react';
import { Hospital } from '../types';

interface StatsOverviewProps {
  hospitals: Hospital[];
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ hospitals }) => {
  const stats = hospitals.reduce(
    (acc, hospital) => {
      acc.totalICU += hospital.resources.icuBeds.total;
      acc.availableICU += hospital.resources.icuBeds.available;
      acc.totalGeneral += hospital.resources.generalBeds.total;
      acc.availableGeneral += hospital.resources.generalBeds.available;
      acc.totalOxygen += hospital.resources.oxygenBeds.total;
      acc.availableOxygen += hospital.resources.oxygenBeds.available;
      acc.totalAmbulances += hospital.resources.ambulances.total;
      acc.availableAmbulances += hospital.resources.ambulances.available;
      return acc;
    },
    {
      totalICU: 0,
      availableICU: 0,
      totalGeneral: 0,
      availableGeneral: 0,
      totalOxygen: 0,
      availableOxygen: 0,
      totalAmbulances: 0,
      availableAmbulances: 0
    }
  );

  const statsCards = [
    {
      title: 'ICU Beds',
      available: stats.availableICU,
      total: stats.totalICU,
      icon: Bed,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      title: 'General Beds',
      available: stats.availableGeneral,
      total: stats.totalGeneral,
      icon: Bed,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      title: 'Oxygen Beds',
      available: stats.availableOxygen,
      total: stats.totalOxygen,
      icon: Activity,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      title: 'Ambulances',
      available: stats.availableAmbulances,
      total: stats.totalAmbulances,
      icon: Truck,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statsCards.map((stat, index) => {
        const percentage = ((stat.available / stat.total) * 100).toFixed(1);
        const isLow = (stat.available / stat.total) < 0.1;
        
        return (
          <div
            key={index}
            className={`${stat.bgColor} ${stat.borderColor} border rounded-xl p-4 relative overflow-hidden`}
          >
            {isLow && (
              <div className="absolute top-2 right-2">
                <AlertCircle className="h-4 w-4 text-red-500" />
              </div>
            )}
            
            <div className="flex items-center justify-between mb-2">
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
              <span className={`text-2xl font-bold ${stat.color}`}>
                {stat.available}
              </span>
            </div>
            
            <h3 className="font-semibold text-gray-900 mb-1">{stat.title}</h3>
            <p className="text-sm text-gray-600">
              of {stat.total} total ({percentage}% available)
            </p>
            
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className={`h-2 rounded-full ${
                  parseFloat(percentage) > 20 ? 'bg-green-500' :
                  parseFloat(percentage) > 10 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${Math.min(parseFloat(percentage), 100)}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};