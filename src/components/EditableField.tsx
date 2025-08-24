import React from 'react';
import { Job } from '../types';

interface EditableFieldProps {
  label: string;
  value: string | null;
  field: keyof Job;
  type?: 'text' | 'email' | 'tel' | 'datetime-local' | 'textarea' | 'select' | 'number';
  options?: string[];
  icon?: React.ComponentType<{ className?: string }>;
  disabled?: boolean;
  isEditing: boolean;
  editedJob: Job;
  setEditedJob: (job: Job) => void;
  formatDate: (dateString: string | null) => string;
  getStatusColor: (status: string | null) => string;
}

export function EditableField({
  label,
  value,
  field,
  type = 'text',
  options = [],
  icon: Icon,
  disabled = false,
  isEditing,
  editedJob,
  setEditedJob,
  formatDate,
  getStatusColor
}: EditableFieldProps) {
  const StatusBadge = ({ status }: { status: string | null }) => (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(status)}`}>
      {status || 'N/A'}
    </span>
  );

  if (isEditing) {
    if (type === 'select') {
      return (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {Icon && <Icon className="h-4 w-4 inline mr-1" />}
            {label}
          </label>
          <select
            value={value || ''}
            onChange={(e) => setEditedJob({ ...editedJob, [field]: e.target.value || null })}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-base ${
              !value ? 'text-gray-400' : 'text-gray-900'
            }`}
          >
            <option value="">Seleziona...</option>
            {options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      );
    } else if (type === 'textarea') {
      return (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {Icon && <Icon className="h-4 w-4 inline mr-1" />}
            {label}
          </label>
          <textarea
            value={value || ''}
            onChange={(e) => setEditedJob({ ...editedJob, [field]: e.target.value || null })}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-base"
            placeholder={`Inserisci ${label.toLowerCase()}...`}
          />
        </div>
      );
    } else {
      return (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {Icon && <Icon className="h-4 w-4 inline mr-1" />}
            {label}
          </label>
          <input
            type={type}
            step={type === 'number' ? '0.1' : undefined}
            min={type === 'number' ? '0' : undefined}
            value={value || ''}
            onChange={(e) => {
              const newValue = e.target.value;
              if (type === 'number') {
                setEditedJob({ ...editedJob, [field]: newValue ? parseFloat(newValue) : null });
              } else {
                setEditedJob({ ...editedJob, [field]: newValue || null });
              }
            }}
            className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-base ${
              disabled 
                ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'border-gray-300 bg-white text-gray-900'
            }`}
            placeholder={type === 'number' ? `Inserisci ${label.toLowerCase()} (es. 2.5)` : `Inserisci ${label.toLowerCase()}...`}
            disabled={disabled}
          />
        </div>
      );
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {Icon && <Icon className="h-4 w-4 inline mr-1" />}
        {label}
      </label>
      {type === 'select' ? (
        value && value !== 'Non previsto' ? (
          <StatusBadge status={value} />
        ) : (
          <p className="text-gray-900 text-base">{value || 'N/A'}</p>
        )
      ) : (
        <p className="text-gray-900 text-base">
          {type === 'datetime-local' ? formatDate(value) : (value || 'N/A')}
        </p>
      )}
    </div>
  );
}