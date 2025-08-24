import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { FilterSection } from './components/FilterSection';
import { JobTable } from './components/JobTable';
import { NewJobModal } from './components/NewJobModal';
import { JobDetailsModal } from './components/JobDetailsModal';
import { LoginPage } from './components/LoginPage';
import { useJobs } from './hooks/useJobs';
import { useAuth } from './hooks/useAuth';
import { Job, FilterState, SortField, SortDirection } from './types';
import { AuthError } from '@supabase/supabase-js';

function App() {
  const { user, loading: authLoading, signIn } = useAuth();
  const [activeSection, setActiveSection] = useState('jobs');
  const { jobs: allJobs, loading, error, createJob, updateJob, deleteJob } = useJobs();
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    client: '',
    job_name: '',
    comune: '',
    provincia: '',
    attivita: '',
    dateStart: '',
    dateEnd: '',
  });
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [isNewJobModalOpen, setIsNewJobModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isJobDetailsModalOpen, setIsJobDetailsModalOpen] = useState(false);
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(false);

  const handleLogin = async (email: string, password: string): Promise<{ error: AuthError | null }> => {
    const { error } = await signIn(email, password);
    return { error };
  };

  // Filter and sort jobs
  useEffect(() => {
    // First filter by page type based on invio_documenti
    let pageFiltered = allJobs.filter(job => {
      if (activeSection === 'completed-jobs') {
        return job.invio_documenti === 'Fatto';
      } else if (activeSection === 'jobs') {
        return job.invio_documenti !== 'Fatto';
      }
      return true;
    });

    // Then apply search filters
    let filtered = pageFiltered.filter(job => {
      const jobDate = job.data_appuntamento ? new Date(job.data_appuntamento) : null;
      const startDate = filters.dateStart ? new Date(filters.dateStart) : null;
      const endDate = filters.dateEnd ? new Date(filters.dateEnd) : null;
      
      const dateInRange = !jobDate || ((!startDate || jobDate >= startDate) && (!endDate || jobDate <= endDate));
      
      return (
        (job.client || '').toLowerCase().includes(filters.client.toLowerCase()) &&
        (job.job_name || '').toLowerCase().includes(filters.job_name.toLowerCase()) &&
        (job.comune || '').toLowerCase().includes(filters.comune.toLowerCase()) &&
        (job.provincia || '').toLowerCase().includes(filters.provincia.toLowerCase()) &&
        (filters.attivita === '' || job.attivita === filters.attivita) &&
        dateInRange
      );
    });

    if (sortField) {
      filtered = [...filtered].sort((a, b) => {
        let aValue: string | number = a[sortField];
        let bValue: string | number = b[sortField];

        if (sortField === 'data_appuntamento') {
          aValue = aValue ? new Date(aValue as string).getTime() : 0;
          bValue = bValue ? new Date(bValue as string).getTime() : 0;
        } else {
          aValue = (aValue as string || '').toLowerCase();
          bValue = (bValue as string || '').toLowerCase();
        }

        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    setFilteredJobs(filtered);
  }, [allJobs, filters, sortField, sortDirection, activeSection]);

  // Show loading spinner while checking authentication
  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg text-gray-600">Caricamento...</div>
      </div>
    );
  }

  // Show login page if not authenticated
  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }






  const handleFilterChange = (field: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      client: '',
      job_name: '',
      comune: '',
      provincia: '',
      attivita: '',
      dateStart: '',
      dateEnd: '',
    });
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleNewJob = async (newJobData: Omit<Job, 'job_id' | 'created_at'>) => {
    try {
      await createJob(newJobData);
    } catch (error) {
      console.error('Failed to create job:', error);
    }
  };

  const handleUpdateJob = async (jobId: number, updates: Partial<Job>) => {
    try {
      const updatedJob = await updateJob(jobId, updates);
      setSelectedJob(updatedJob);
    } catch (error) {
      console.error('Failed to update job:', error);
    }
  };

  const handleDeleteJob = async (jobId: number) => {
    try {
      await deleteJob(jobId);
    } catch (error) {
      console.error('Failed to delete job:', error);
    }
  };

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    setIsJobDetailsModalOpen(true);
  };

  const hasActiveFilters = Object.values(filters).some(filter => filter !== '');

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg text-gray-600">Caricamento...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg text-red-600">Errore: {error}</div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'jobs':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Lavori</h1>
              </div>
              <button
                onClick={() => setIsNewJobModalOpen(true)}
                className="flex items-center space-x-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors shadow-sm"
              >
                <Plus className="h-5 w-5" />
                <span>Nuovo</span>
              </button>
            </div>

            <FilterSection
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              hasActiveFilters={hasActiveFilters}
              totalJobs={allJobs.filter(job => job.invio_documenti !== 'Fatto').length}
              visibleJobs={filteredJobs.length}
              isCollapsed={isFilterCollapsed}
              onToggleCollapse={() => setIsFilterCollapsed(!isFilterCollapsed)}
            />

            <JobTable
              jobs={filteredJobs}
              onJobClick={handleJobClick}
              sortField={sortField}
              sortDirection={sortDirection}
              onSort={handleSort}
            />
          </div>
        );
      case 'completed-jobs':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Lavori Completati</h1>
              </div>
            </div>

            <FilterSection
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              hasActiveFilters={hasActiveFilters}
              totalJobs={allJobs.filter(job => job.invio_documenti === 'Fatto').length}
              visibleJobs={filteredJobs.length}
              isCollapsed={isFilterCollapsed}
              onToggleCollapse={() => setIsFilterCollapsed(!isFilterCollapsed)}
            />

            <JobTable
              jobs={filteredJobs}
              onJobClick={handleJobClick}
              sortField={sortField}
              sortDirection={sortDirection}
              onSort={handleSort}
            />
          </div>
        );
      case 'clients':
        return (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500 text-lg">Sezione Clienti - In sviluppo</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {renderContent()}
        </div>
      </main>

      <NewJobModal
        isOpen={isNewJobModalOpen}
        onClose={() => setIsNewJobModalOpen(false)}
        onSave={handleNewJob}
      />

      <JobDetailsModal
        job={selectedJob}
        isOpen={isJobDetailsModalOpen}
        onClose={() => {
          setIsJobDetailsModalOpen(false);
          setSelectedJob(null);
        }}
        onUpdate={handleUpdateJob}
        onDelete={handleDeleteJob}
      />
    </div>
  );
}

export default App;