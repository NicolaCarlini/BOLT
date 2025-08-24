import React, { useState, useEffect } from 'react';
import { X, Edit3, Save, Trash2, Calendar, MapPin, User, Briefcase, Phone, Mail, FileText, Wrench, AlertCircle } from 'lucide-react';
import { Job } from '../types';
import { EditableField } from './EditableField';

interface JobDetailsModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (jobId: number, updates: Partial<Job>) => void;
  onDelete: (jobId: number) => void;
}

export function JobDetailsModal({ job, isOpen, onClose, onUpdate, onDelete }: JobDetailsModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedJob, setEditedJob] = useState<Job | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showUnsavedWarning, setShowUnsavedWarning] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    if (job) {
      setEditedJob({ ...job });
      setHasUnsavedChanges(false);
    }
  }, [job]);

  // Check if there are unsaved changes
  useEffect(() => {
    if (job && editedJob && isEditing) {
      const hasChanges = JSON.stringify(job) !== JSON.stringify(editedJob);
      setHasUnsavedChanges(hasChanges);
    } else {
      setHasUnsavedChanges(false);
    }
  }, [job, editedJob, isEditing]);

  if (!isOpen || !job || !editedJob) return null;

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const handleSave = async () => {
    try {
      await onUpdate(job.job_id, editedJob);
      setIsEditing(false);
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error('Failed to update job:', error);
    }
  };

  const handleClose = () => {
    if (isEditing && hasUnsavedChanges) {
      setShowUnsavedWarning(true);
    } else {
      setIsEditing(false);
      setHasUnsavedChanges(false);
      onClose();
    }
  };

  const handleConfirmClose = () => {
    setShowUnsavedWarning(false);
    setIsEditing(false);
    setHasUnsavedChanges(false);
    setEditedJob({ ...job });
    onClose();
  };

  const handleCancelClose = () => {
    setShowUnsavedWarning(false);
  };

  const handleDelete = async () => {
    try {
      await onDelete(job.job_id);
      setShowDeleteConfirm(false);
      setHasUnsavedChanges(false);
      onClose();
    } catch (error) {
      console.error('Failed to delete job:', error);
    }
  };

  const getStatusColor = (status: string | null) => {
    if (!status) return 'bg-gray-100 text-gray-800';
    
    switch (status) {
      case 'Urgente':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Attendere':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Fatto':
      case 'Fatto ABACO E.V.':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Presente':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Ordinato':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Non previsto':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'Mancante':
      case 'Mancanti':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'In corso':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Programmato':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'Da programmare':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Di altro progettista':
        return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      case 'In attesa documenti cliente':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Fatto altro progettista':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Autorizzato':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Non autorizzato':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Autorizzato e urgente':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Ok':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Ordinato':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const StatusBadge = ({ status }: { status: string | null }) => (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(status)}`}>
      {status || 'N/A'}
    </span>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <Briefcase className="h-6 w-6 mr-2 text-teal-500" />
            Dettagli Lavoro #{job.job_id}
          </h2>
          <div className="flex items-center space-x-2">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
              >
                <Edit3 className="h-4 w-4" />
                <span>Modifica</span>
              </button>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Save className="h-4 w-4" />
                  <span>Salva</span>
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setHasUnsavedChanges(false);
                    setEditedJob({ ...job });
                  }}
                  className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <X className="h-4 w-4" />
                  <span>Annulla</span>
                </button>
              </div>
            )}
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              <span>Elimina</span>
            </button>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            {/* Informazioni Principali Section */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Informazioni Principali</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <EditableField
                  label="Cliente"
                  value={editedJob.client}
                  field="client"
                  icon={User}
                  isEditing={isEditing}
                  editedJob={editedJob}
                  setEditedJob={setEditedJob}
                  formatDate={formatDate}
                  getStatusColor={getStatusColor}
                />
                
                <EditableField
                  label="Lavoro"
                  value={editedJob.job_name}
                  field="job_name"
                  icon={Briefcase}
                  isEditing={isEditing}
                  editedJob={editedJob}
                  setEditedJob={setEditedJob}
                  formatDate={formatDate}
                  getStatusColor={getStatusColor}
                />
                
                <EditableField
                  label="Comune"
                  value={editedJob.comune}
                  field="comune"
                  icon={MapPin}
                  isEditing={isEditing}
                  editedJob={editedJob}
                  setEditedJob={setEditedJob}
                  formatDate={formatDate}
                  getStatusColor={getStatusColor}
                />
                
                <EditableField
                  label="Provincia"
                  value={editedJob.provincia}
                  field="provincia"
                  isEditing={isEditing}
                  editedJob={editedJob}
                  setEditedJob={setEditedJob}
                  formatDate={formatDate}
                  getStatusColor={getStatusColor}
                />
                
                <EditableField
                  label="Attività"
                  value={editedJob.attivita}
                  field="attivita"
                  type="select"
                  options={['Servizio tecnico', 'Fornitura', 'Installazione', 'Ispezione']}
                  icon={Wrench}
                  isEditing={isEditing}
                  editedJob={editedJob}
                  setEditedJob={setEditedJob}
                  formatDate={formatDate}
                  getStatusColor={getStatusColor}
                />
                
                <EditableField
                  label="Data e Ora Appuntamento"
                  value={editedJob.data_appuntamento}
                  field="data_appuntamento"
                  type="datetime-local"
                  icon={Calendar}
                  isEditing={isEditing}
                  editedJob={editedJob}
                  setEditedJob={setEditedJob}
                  formatDate={formatDate}
                  getStatusColor={getStatusColor}
                />
                
                <EditableField
                  label="Giornate previste"
                  value={editedJob.giornate_previste?.toString() || null}
                  field="giornate_previste"
                  type="number"
                  isEditing={isEditing}
                  editedJob={editedJob}
                  setEditedJob={setEditedJob}
                  formatDate={formatDate}
                  getStatusColor={getStatusColor}
                />
                
                <EditableField
                  label="Provenienza"
                  value={editedJob.provenienza}
                  field="provenienza"
                  isEditing={isEditing}
                  editedJob={editedJob}
                  setEditedJob={setEditedJob}
                  formatDate={formatDate}
                  getStatusColor={getStatusColor}
                />
                
                <EditableField
                  label="Telefono"
                  value={editedJob.telefono}
                  field="telefono"
                  type="tel"
                  icon={Phone}
                  isEditing={isEditing}
                  editedJob={editedJob}
                  setEditedJob={setEditedJob}
                  formatDate={formatDate}
                  getStatusColor={getStatusColor}
                />
                
                <EditableField
                  label="Email"
                  value={editedJob.email}
                  field="email"
                  type="email"
                  icon={Mail}
                  isEditing={isEditing}
                  editedJob={editedJob}
                  setEditedJob={setEditedJob}
                  formatDate={formatDate}
                  getStatusColor={getStatusColor}
                />
                
                <EditableField
                  label="Referente"
                  value={editedJob.referente}
                  field="referente"
                  icon={User}
                  isEditing={isEditing}
                  editedJob={editedJob}
                  setEditedJob={setEditedJob}
                  formatDate={formatDate}
                  getStatusColor={getStatusColor}
                />
                
                <EditableField
                  label="Tipo di Intervento"
                  value={editedJob.tipo_intervento}
                  field="tipo_intervento"
                  icon={Wrench}
                  isEditing={isEditing}
                  editedJob={editedJob}
                  setEditedJob={setEditedJob}
                  formatDate={formatDate}
                  getStatusColor={getStatusColor}
                />
                
                <EditableField
                  label="Coordinate"
                  value={editedJob.coordinate}
                  field="coordinate"
                  icon={MapPin}
                  isEditing={isEditing}
                  editedJob={editedJob}
                  setEditedJob={setEditedJob}
                  formatDate={formatDate}
                  getStatusColor={getStatusColor}
                />
                
                <EditableField
                  label="Data Creazione"
                  value={editedJob.created_at}
                  field="created_at"
                  type="datetime-local"
                  icon={Calendar}
                  isEditing={isEditing}
                  editedJob={editedJob}
                  setEditedJob={setEditedJob}
                  formatDate={formatDate}
                  getStatusColor={getStatusColor}
                />
                
                <EditableField
                  label="Priorità"
                  value={editedJob.priorita}
                  field="priorita"
                  type="select"
                  options={['Urgente', 'Non urgente']}
                  isEditing={isEditing}
                  editedJob={editedJob}
                  setEditedJob={setEditedJob}
                  formatDate={formatDate}
                  getStatusColor={getStatusColor}
                />
              </div>
            </div>

            {/* Avanzamento Lavori Section */}
            <div className="bg-pink-10 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Avanzamento Lavori</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <EditableField
                  label="Progetto Preliminare"
                  value={editedJob.progetto_preliminare}
                  field="progetto_preliminare"
                  type="select"
                  options={['Mancante', 'Fatto ABACO E.V.', 'Fatto altro progettista']}
                  isEditing={isEditing}
                  editedJob={editedJob}
                  setEditedJob={setEditedJob}
                  formatDate={formatDate}
                  getStatusColor={getStatusColor}
                />
                
                <EditableField
                  label="Documento di Cantiere"
                  value={editedJob.documento_cantiere}
                  field="documento_cantiere"
                  type="select"
                  options={['Mancanti', 'Fatto', 'Non previsto']}
                  isEditing={isEditing}
                  editedJob={editedJob}
                  setEditedJob={setEditedJob}
                  formatDate={formatDate}
                  getStatusColor={getStatusColor}
                />
                
                <EditableField
                  label="Materiale"
                  value={editedJob.materiale}
                  field="materiale"
                  type="select"
                  options={['Non previsto', 'Mancante', 'Fatto', 'Ordinato']}
                  isEditing={isEditing}
                  editedJob={editedJob}
                  setEditedJob={setEditedJob}
                  formatDate={formatDate}
                  getStatusColor={getStatusColor}
                />
                
                <EditableField
                  label="Acconto"
                  value={editedJob.acconto}
                  field="acconto"
                  type="select"
                  options={['Ok', 'Non previsto']}
                  isEditing={isEditing}
                  editedJob={editedJob}
                  setEditedJob={setEditedJob}
                  formatDate={formatDate}
                  getStatusColor={getStatusColor}
                />
                
                <EditableField
                  label="Attrezzature a Noleggio"
                  value={editedJob.cestello}
                  field="cestello"
                  type="select"
                  options={['Non previsto', 'Mancante', 'Fatto']}
                  isEditing={isEditing}
                  editedJob={editedJob}
                  setEditedJob={setEditedJob}
                  formatDate={formatDate}
                  getStatusColor={getStatusColor}
                />
                
                <EditableField
                  label="Viaggi e Hotel"
                  value={editedJob.viaggi_hotel}
                  field="viaggi_hotel"
                  type="select"
                  options={['Non previsto', 'Mancante', 'Fatto']}
                  isEditing={isEditing}
                  editedJob={editedJob}
                  setEditedJob={setEditedJob}
                  formatDate={formatDate}
                  getStatusColor={getStatusColor}
                />
                
                <EditableField
                  label="Avanzamento Lavoro"
                  value={editedJob.lavoro}
                  field="lavoro"
                  type="select"
                  options={['In corso', 'Programmato', 'Da programmare', 'Fatto']}
                  isEditing={isEditing}
                  editedJob={editedJob}
                  setEditedJob={setEditedJob}
                  formatDate={formatDate}
                  getStatusColor={getStatusColor}
                />
              </div>
            </div>

            {/* Documentazione Tecnica Section */}
            <div className="bg-blue-10 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Documentazione Tecnica</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <EditableField
                  label="Disegno Definitivo"
                  value={editedJob.disegno_definitivo}
                  field="disegno_definitivo"
                  type="select"
                  options={['Mancante', 'In attesa documenti cliente', 'Fatto', 'Non previsto']}
                  isEditing={isEditing}
                  editedJob={editedJob}
                  setEditedJob={setEditedJob}
                  formatDate={formatDate}
                  getStatusColor={getStatusColor}
                />
                
                <EditableField
                  label="Firma Progetto"
                  value={editedJob.firma_progetto}
                  field="firma_progetto"
                  type="select"
                  options={['Geom. Pasquale Iacolare', 'Ing. Francesco Profilato', 'Non previsto', 'Non ABACO E.V.']}
                  isEditing={isEditing}
                  editedJob={editedJob}
                  setEditedJob={setEditedJob}
                  formatDate={formatDate}
                  getStatusColor={getStatusColor}
                />
                
                <EditableField
                  label="Firma Progetto non ABACO E.V."
                  value={editedJob.firma_progetto_non_abaco}
                  field="firma_progetto_non_abaco"
                  disabled={editedJob.firma_progetto !== 'Non ABACO E.V.'}
                  isEditing={isEditing}
                  editedJob={editedJob}
                  setEditedJob={setEditedJob}
                  formatDate={formatDate}
                  getStatusColor={getStatusColor}
                />
                
                <EditableField
                  label="Relazione di Calcolo"
                  value={editedJob.relazione_calcolo}
                  field="relazione_calcolo"
                  type="select"
                  options={['Mancante', 'In attesa documenti cliente', 'Fatto', 'Non previsto']}
                  isEditing={isEditing}
                  editedJob={editedJob}
                  setEditedJob={setEditedJob}
                  formatDate={formatDate}
                  getStatusColor={getStatusColor}
                />
                
                <EditableField
                  label="Firma Relazione"
                  value={editedJob.firma_relazione}
                  field="firma_relazione"
                  type="select"
                  options={['Ing. Giuliano Wolf', 'Ing. Francesco Profilato', 'Non previsto']}
                  options={['Ing. Giuliano Wolf', 'Ing. Francesco Profilato', 'Non previsto', 'Non ABACO E.V.']}
                  isEditing={isEditing}
                  editedJob={editedJob}
                  setEditedJob={setEditedJob}
                  formatDate={formatDate}
                  getStatusColor={getStatusColor}
                />
                
                <EditableField
                  label="Firma Relazione non ABACO E.V."
                  value={editedJob.firma_relazione_non_abaco}
                  field="firma_relazione_non_abaco"
                  disabled={editedJob.firma_relazione !== 'Non ABACO E.V.'}
                  isEditing={isEditing}
                  editedJob={editedJob}
                  setEditedJob={setEditedJob}
                  formatDate={formatDate}
                  getStatusColor={getStatusColor}
                />
                
                <EditableField
                  label="Dichiarazione Conf."
                  value={editedJob.dichiarazione_conf}
                  field="dichiarazione_conf"
                  type="select"
                  options={['Urgente', 'Attendere', 'Fatto', 'Non previsto']}
                  isEditing={isEditing}
                  editedJob={editedJob}
                  setEditedJob={setEditedJob}
                  formatDate={formatDate}
                  getStatusColor={getStatusColor}
                />
                
                <EditableField
                  label="Autorizzazione Invio Documenti"
                  value={editedJob.autorizzazione_invio}
                  field="autorizzazione_invio"
                  type="select"
                  options={['Non autorizzato', 'Autorizzato', 'Autorizzato e urgente', 'Non previsto']}
                  isEditing={isEditing}
                  editedJob={editedJob}
                  setEditedJob={setEditedJob}
                  formatDate={formatDate}
                  getStatusColor={getStatusColor}
                />
                
                <EditableField
                  label="Invio Documenti"
                  value={editedJob.invio_documenti}
                  field="invio_documenti"
                  type="select"
                  options={['Fatto', 'Non previsto']}
                  isEditing={isEditing}
                  editedJob={editedJob}
                  setEditedJob={setEditedJob}
                  formatDate={formatDate}
                  getStatusColor={getStatusColor}
                />
              </div>
            </div>

            {/* Fatturazione Pagamenti Section */}
            <div className="bg-yellow-10 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Fatturazione Pagamenti</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <EditableField
                  label="Fatturazione Acconto"
                  value={editedJob.fatturazione_acconto}
                  field="fatturazione_acconto"
                  type="select"
                  options={['Fatto', 'Non previsto']}
                  isEditing={isEditing}
                  editedJob={editedJob}
                  setEditedJob={setEditedJob}
                  formatDate={formatDate}
                  getStatusColor={getStatusColor}
                />
                
                <EditableField
                  label="Verifica Pagamento Acconto"
                  value={editedJob.verifica_pagamento_acconto}
                  field="verifica_pagamento_acconto"
                  type="select"
                  options={['Fatto', 'Non previsto']}
                  isEditing={isEditing}
                  editedJob={editedJob}
                  setEditedJob={setEditedJob}
                  formatDate={formatDate}
                  getStatusColor={getStatusColor}
                />
                
                <EditableField
                  label="Fatturazione Saldo"
                  value={editedJob.fatturazione_saldo}
                  field="fatturazione_saldo"
                  type="select"
                  options={['Fatto', 'Non previsto']}
                  isEditing={isEditing}
                  editedJob={editedJob}
                  setEditedJob={setEditedJob}
                  formatDate={formatDate}
                  getStatusColor={getStatusColor}
                />
                
                <EditableField
                  label="Verifica Pagamento Saldo"
                  value={editedJob.verifica_pagamento_saldo}
                  field="verifica_pagamento_saldo"
                  type="select"
                  options={['Fatto', 'Non previsto']}
                  isEditing={isEditing}
                  editedJob={editedJob}
                  setEditedJob={setEditedJob}
                  formatDate={formatDate}
                  getStatusColor={getStatusColor}
                />
              </div>
            </div>

            {/* Note Section */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Note</h3>
              
              <EditableField
                label="Note"
                value={editedJob.note}
                field="note"
                type="textarea"
                icon={FileText}
                isEditing={isEditing}
                editedJob={editedJob}
                setEditedJob={setEditedJob}
                formatDate={formatDate}
                getStatusColor={getStatusColor}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-60">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center mb-4">
              <AlertCircle className="h-6 w-6 text-red-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Conferma Eliminazione</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Sei sicuro di voler eliminare questo lavoro? Questa azione non può essere annullata.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Annulla
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Elimina
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Unsaved Changes Warning Modal */}
      {showUnsavedWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-60">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center mb-4">
              <AlertCircle className="h-6 w-6 text-yellow-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Modifiche non salvate</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Hai delle modifiche non salvate. Sei sicuro di voler chiudere senza salvare?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCancelClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Annulla
              </button>
              <button
                onClick={handleConfirmClose}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Chiudi senza salvare
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}