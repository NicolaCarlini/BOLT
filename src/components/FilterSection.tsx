import React from 'react';
import { Search, Filter, X, ChevronUp, ChevronDown } from 'lucide-react';
import { FilterState } from '../types';

interface FilterSectionProps {
  filters: FilterState;
  onFilterChange: (field: keyof FilterState, value: string) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
  totalJobs: number;
  visibleJobs: number;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function FilterSection({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  hasActiveFilters,
  totalJobs,
  visibleJobs,
  isCollapsed,
  onToggleCollapse
}: FilterSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filtri
            </h3>
            {!hasActiveFilters && (
              <div className="flex items-center text-sm text-gray-500">
                <span>Nessun filtro applicato</span>
              </div>
            )}
          </div>
          <div className="text-sm text-gray-500">
            <span className="mr-4">Totale: {totalJobs}</span>
            <span>Visibili: {visibleJobs}</span>
          </div>
        </div>
            {hasActiveFilters && (
              <button
                onClick={onClearFilters}
                className="flex items-center justify-center w-6 h-6 text-gray-400 hover:text-gray-600 transition-colors"
                title="Cancella filtri"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <button
              onClick={onToggleCollapse}
              className="flex items-center justify-center w-8 h-8 text-gray-700 hover:text-gray-900 transition-colors"
              title={isCollapsed ? "Espandi filtri" : "Riduci filtri"}
            >
              {isCollapsed ? <ChevronDown className="h-6 w-6" /> : <ChevronUp className="h-6 w-6" />}
            </button>
      </div>
      
      {!isCollapsed && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cliente
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cerca cliente..."
              value={filters.client}
              onChange={(e) => onFilterChange('client', e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Lavoro
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cerca lavoro..."
              value={filters.job_name}
              onChange={(e) => onFilterChange('job_name', e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Comune
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cerca comune..."
              value={filters.comune}
              onChange={(e) => onFilterChange('comune', e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Provincia
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cerca provincia..."
              value={filters.provincia}
              onChange={(e) => onFilterChange('provincia', e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Attività
          </label>
          <select
            value={filters.attivita}
            onChange={(e) => onFilterChange('attivita', e.target.value)}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
              !filters.attivita ? 'text-gray-400' : 'text-gray-900'
            }`}
          >
            <option value="">Tutte le attività</option>
            <option value="Servizio tecnico">Servizio tecnico</option>
            <option value="Fornitura">Fornitura</option>
            <option value="Installazione">Installazione</option>
            <option value="Ispezione">Ispezione</option>
          </select>
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Data appuntamento
          </label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <input
                type="date"
                placeholder="Data inizio"
                value={filters.dateStart}
                onChange={(e) => onFilterChange('dateStart', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
              />
            </div>
            <div>
              <input
                type="date"
                placeholder="Data fine"
                value={filters.dateEnd}
                onChange={(e) => onFilterChange('dateEnd', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
              />
            </div>
          </div>
        </div>
        </div>
      )}
    </div>
  );
}