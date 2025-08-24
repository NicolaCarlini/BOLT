import React from 'react';
import { ChevronUp, ChevronDown, Calendar, Briefcase } from 'lucide-react';
import { Job, SortField, SortDirection } from '../types';

interface JobTableProps {
  jobs: Job[];
  onJobClick: (job: Job) => void;
  sortField: SortField | null;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
}

export function JobTable({ jobs, onJobClick, sortField, sortDirection, onSort }: JobTableProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const SortButton = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <button
      onClick={() => onSort(field)}
      className="flex items-center space-x-1 text-left font-medium text-gray-900 hover:text-teal-600 transition-colors"
    >
      <span>{children}</span>
      <div className="flex flex-col">
        <ChevronUp
          className={`h-3 w-3 ${
            sortField === field && sortDirection === 'asc' ? 'text-teal-600' : 'text-gray-400'
          }`}
        />
        <ChevronDown
          className={`h-3 w-3 -mt-1 ${
            sortField === field && sortDirection === 'desc' ? 'text-teal-600' : 'text-gray-400'
          }`}
        />
      </div>
    </button>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <SortButton field="client">Cliente</SortButton>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <SortButton field="job_name">Lavoro</SortButton>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <SortButton field="comune">Comune</SortButton>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <SortButton field="provincia">Provincia</SortButton>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <SortButton field="data_appuntamento">Data appuntamento</SortButton>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {jobs.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center">
                    <Briefcase className="h-12 w-12 text-gray-400 mb-2" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">Nessun lavoro trovato</h3>
                    <p className="text-gray-500">Modifica i filtri di ricerca o aggiungi un nuovo lavoro.</p>
                  </div>
                </td>
              </tr>
            ) : (
              jobs.map((job) => (
                <tr
                  key={job.job_id}
                  onClick={() => onJobClick(job)}
                  className="hover:bg-teal-50 cursor-pointer transition-colors even:bg-gray-50 odd:bg-white"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900 max-w-[200px] truncate" title={job.client || 'N/A'}>
                          {job.client || 'N/A'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900 max-w-[200px] truncate" title={job.job_name || 'N/A'}>
                          {job.job_name || 'N/A'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm text-gray-900 max-w-[150px] truncate" title={job.comune || 'N/A'}>
                        {job.comune || 'N/A'}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-semibold max-w-[100px] truncate" title={job.provincia || 'N/A'}>
                      {job.provincia || 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                      <div className="text-sm text-gray-900">{job.data_appuntamento ? formatDate(job.data_appuntamento) : 'N/A'}</div>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}