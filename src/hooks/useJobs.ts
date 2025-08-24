import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Job } from '../types';

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Helper function to convert empty strings to null for enum fields
  const sanitizeJobData = (data: any) => {
    const sanitized = { ...data };
    
    // List of enum fields that should be null instead of empty string
    const enumFields = [
      'provenienza',
      'tipo_intervento',
      'progetto_preliminare',
      'documento_cantiere',
      'materiale',
      'acconto',
      'cestello',
      'viaggi_hotel',
      'lavoro',
      'disegno_definitivo',
      'firma_progetto',
      'relazione_calcolo',
      'firma_relazione',
      'dichiarazione_conf',
      'autorizzazione_invio',
      'invio_documenti',
      'fatturazione_acconto',
      'verifica_pagamento_acconto',
      'fatturazione_saldo',
      'verifica_pagamento_saldo',
      'attivita',
      'firma_progetto_non_abaco',
      'firma_relazione_non_abaco',
      'giornate_previste',
      'priorita',
    ];
    
    // List of date fields that should be null instead of empty string
    const dateFields = [
      'data_appuntamento'
    ];
    
    enumFields.forEach(field => {
      if (sanitized[field] === '') {
        sanitized[field] = null;
      }
    });
    
    dateFields.forEach(field => {
      if (sanitized[field] === '') {
        sanitized[field] = null;
      } else if (sanitized[field] && field === 'data_appuntamento') {
        // Validate that data_appuntamento is a valid date
        const dateValue = new Date(sanitized[field]);
        if (dateValue.toString() === 'Invalid Date') {
          sanitized[field] = null;
        }
      }
    });
    
    // Handle text fields that should be null instead of empty string
    const textFields = ['referente'];
    textFields.forEach(field => {
      if (sanitized[field] === '') {
        sanitized[field] = null;
      }
    });
    
    return sanitized;
  };

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('Jobs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setJobs(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createJob = async (jobData: Omit<Job, 'job_id' | 'created_at'>) => {
    try {
      // Generate a unique 8-digit numeric string job_id
      let jobId: number;
      let isUnique = false;
      
      while (!isUnique) {
        // Generate random 8-digit number (10000000 to 99999999)
        jobId = Math.floor(Math.random() * 90000000) + 10000000;
        
        // Check if this job_id already exists
        const { data: existingJob } = await supabase
          .from('Jobs')
          .select('job_id')
          .eq('job_id', jobId)
          .maybeSingle();
        
        if (!existingJob) {
          isUnique = true;
        }
      }

      // Sanitize the job data before inserting
      const sanitizedData = sanitizeJobData({ ...jobData, job_id: jobId });

      const { data, error } = await supabase
        .from('Jobs')
        .insert([sanitizedData])
        .select()
        .single();

      if (error) throw error;
      setJobs(prev => [data, ...prev]);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create job');
      throw err;
    }
  };

  const updateJob = async (id: number, updates: Partial<Job>) => {
    try {
      // Sanitize the updates before sending
      const sanitizedUpdates = sanitizeJobData(updates);

      const { data, error } = await supabase
        .from('Jobs')
        .update(sanitizedUpdates)
        .eq('job_id', id)
        .select()
        .single();

      if (error) throw error;
      setJobs(prev => prev.map(job => job.job_id === id ? data : job));
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update job');
      throw err;
    }
  };

  const deleteJob = async (id: number) => {
    try {
      const { error } = await supabase
        .from('Jobs')
        .delete()
        .eq('job_id', id);

      if (error) throw error;
      setJobs(prev => prev.filter(job => job.job_id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete job');
      throw err;
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return {
    jobs,
    loading,
    error,
    createJob,
    updateJob,
    deleteJob,
    refetch: fetchJobs
  };
}