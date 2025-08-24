import React, { useState } from 'react';
import { X, Plus, Calendar, MapPin, User, Briefcase, AlertCircle, Phone, Mail, FileText, Wrench } from 'lucide-react';
import { Job } from '../types';

interface NewJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (job: Omit<Job, 'job_id' | 'created_at'>) => void;
}

export function NewJobModal({ isOpen, onClose, onSave }: NewJobModalProps) {
  const [formData, setFormData] = useState({
    client: '',
    job_name: '',
    comune: '',
    provincia: '',
    data_appuntamento: '',
    provenienza: '',
    telefono: '',
    email: '',
    tipo_intervento: '',
    coordinate: '',
    giornate_previste: '',
    priorita: '',
    progetto_preliminare: '',
    documento_cantiere: '',
    materiale: '',
    acconto: '',
    cestello: '',
    viaggi_hotel: '',
    lavoro: '',
    disegno_definitivo: '',
    firma_progetto: '',
    relazione_calcolo: '',
    firma_relazione: '',
    dichiarazione_conf: '',
    autorizzazione_invio: '',
    invio_documenti: '',
    note: '',
    fatturazione_acconto: '',
    verifica_pagamento_acconto: '',
    fatturazione_saldo: '',
    verifica_pagamento_saldo: '',
    attivita: '',
    firma_progetto_non_abaco: '',
    firma_relazione_non_abaco: '',
    referente: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    if (!formData.client.trim()) newErrors.client = 'Campo obbligatorio';
    if (!formData.job_name.trim()) newErrors.job_name = 'Campo obbligatorio';
    if (!formData.comune.trim()) newErrors.comune = 'Campo obbligatorio';
    if (!formData.provincia.trim()) newErrors.provincia = 'Campo obbligatorio';
    if (!formData.attivita.trim()) newErrors.attivita = 'Campo obbligatorio';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSave(formData);
      setFormData({
        client: '',
        job_name: '',
        comune: '',
        provincia: '',
        data_appuntamento: '',
        provenienza: '',
        telefono: '',
        email: '',
        tipo_intervento: '',
        coordinate: '',
        giornate_previste: '',
        priorita: '',
        progetto_preliminare: '',
        documento_cantiere: '',
        materiale: '',
        acconto: '',
        cestello: '',
        disegno_definitivo: '',
        firma_progetto: '',
        relazione_calcolo: '',
        firma_relazione: '',
        dichiarazione_conf: '',
        autorizzazione_invio: '',
        invio_documenti: '',
        note: '',
        fatturazione_acconto: '',
        verifica_pagamento_acconto: '',
        fatturazione_saldo: '',
        verifica_pagamento_saldo: '',
        attivita: '',
        coordinate: '',
        firma_progetto_non_abaco: '',
        firma_relazione_non_abaco: '',
      });
      setErrors({});
      onClose();
    }
  };

  const handleCancel = () => {
    setFormData({
      client: '',
      job_name: '',
      comune: '',
      provincia: '',
      data_appuntamento: '',
      provenienza: '',
      telefono: '',
      email: '',
      tipo_intervento: '',
      progetto_preliminare: '',
      documento_cantiere: '',
      materiale: '',
      acconto: '',
      cestello: '',
      viaggi_hotel: '',
      previsione_fine_lavori_enum: '',
      lavoro: '',
      disegno_definitivo: '',
      firma_progetto: '',
      relazione_calcolo: '',
      firma_relazione: '',
      dichiarazione_conf: '',
      autorizzazione_invio: '',
      invio_documenti: '',
      note: '',
      fatturazione_acconto: '',
      verifica_pagamento_acconto: '',
      fatturazione_saldo: '',
      verifica_pagamento_saldo: '',
      attivita: '',
      firma_progetto_non_abaco: '',
      firma_relazione_non_abaco: '',
      priorita: '',
      referente: '',
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <Plus className="h-6 w-6 mr-2 text-teal-500" />
            Nuovo Lavoro
          </h2>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Informazioni Principali Section */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Informazioni Principali</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="h-4 w-4 inline mr-1" />
                    Cliente *
                  </label>
                  <input
                    type="text"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                      errors.client ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Inserisci nome cliente"
                  />
                  {errors.client && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.client}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Briefcase className="h-4 w-4 inline mr-1" />
                    Lavoro *
                  </label>
                  <input
                    type="text"
                    value={formData.job_name}
                    onChange={(e) => setFormData({ ...formData, job_name: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                      errors.job_name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Inserisci tipo di lavoro"
                  />
                  {errors.job_name && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.job_name}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="h-4 w-4 inline mr-1" />
                      Comune *
                    </label>
                    <input
                      type="text"
                      value={formData.comune}
                      onChange={(e) => setFormData({ ...formData, comune: e.target.value })}
                      className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                        errors.comune ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Inserisci comune"
                    />
                    {errors.comune && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.comune}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Provincia *
                    </label>
                    <input
                      type="text"
                      value={formData.provincia}
                      onChange={(e) => setFormData({ ...formData, provincia: e.target.value })}
                      className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                        errors.provincia ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Inserisci provincia (es. MI)"
                    />
                    {errors.provincia && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.provincia}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Wrench className="h-4 w-4 inline mr-1" />
                    Attività *
                  </label>
                  <select
                    value={formData.attivita}
                    onChange={(e) => setFormData({ ...formData, attivita: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                      errors.attivita ? 'border-red-500' : 'border-gray-300'
                    } ${!formData.attivita ? 'text-gray-400' : 'text-gray-900'}`}
                  >
                    <option value="">Seleziona attività...</option>
                    <option value="Servizio tecnico">Servizio tecnico</option>
                    <option value="Fornitura">Fornitura</option>
                    <option value="Installazione">Installazione</option>
                    <option value="Ispezione">Ispezione</option>
                  </select>
                  {errors.attivita && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.attivita}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="h-4 w-4 inline mr-1" />
                    Data e Ora Appuntamento
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.data_appuntamento}
                    onChange={(e) => setFormData({ ...formData, data_appuntamento: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Giornate previste
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={formData.giornate_previste}
                    onChange={(e) => setFormData({ ...formData, giornate_previste: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Inserisci numero di giornate (es. 2.5)"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Provenienza
                    </label>
                    <input
                      type="text"
                      value={formData.provenienza}
                      onChange={(e) => setFormData({ ...formData, provenienza: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="Inserisci provenienza"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="h-4 w-4 inline mr-1" />
                      Telefono
                    </label>
                    <input
                      type="tel"
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="Inserisci numero di telefono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="h-4 w-4 inline mr-1" />
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Inserisci email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="h-4 w-4 inline mr-1" />
                    Referente
                  </label>
                  <input
                    type="text"
                    value={formData.referente}
                    onChange={(e) => setFormData({ ...formData, referente: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Inserisci nome referente"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Wrench className="h-4 w-4 inline mr-1" />
                    Tipo di Intervento
                  </label>
                  <input
                    type="text"
                    value={formData.tipo_intervento}
                    onChange={(e) => setFormData({ ...formData, tipo_intervento: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Inserisci tipo di intervento"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="h-4 w-4 inline mr-1" />
                    Coordinate
                  </label>
                  <input
                    type="text"
                    value={formData.coordinate}
                    onChange={(e) => setFormData({ ...formData, coordinate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Inserisci coordinate (es. 45.4642, 9.1900)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priorità
                  </label>
                  <select
                    value={formData.priorita}
                    onChange={(e) => setFormData({ ...formData, priorita: e.target.value })}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                      !formData.priorita ? 'text-gray-400' : 'text-gray-900'
                    }`}
                  >
                    <option value="">Seleziona priorità...</option>
                    <option value="Urgente">Urgente</option>
                    <option value="Non urgente">Non urgente</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Stato Progetto Section */}
            <div className="bg-pink-10 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Avanzamento Lavori</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Progetto Preliminare
                  </label>
                  <select
                    value={formData.progetto_preliminare}
                    onChange={(e) => setFormData({ ...formData, progetto_preliminare: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                      formData.progetto_preliminare === 'Mancante' 
                        ? 'bg-red-100 border-red-500 text-red-800' 
                        : formData.progetto_preliminare === 'Fatto ABACO E.V.' 
                        ? 'bg-green-100 border-green-500 text-green-800'
                        : formData.progetto_preliminare === 'Fatto altro progettista'
                        ? 'bg-blue-100 border-blue-500 text-blue-800'
                        : !formData.progetto_preliminare 
                        ? 'bg-white border-gray-300 text-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="">Seleziona...</option>
                    <option value="Mancante">Mancante</option>
                    <option value="Fatto ABACO E.V.">Fatto ABACO E.V.</option>
                    <option value="Fatto altro progettista">Fatto altro progettista</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Documento di Cantiere
                  </label>
                  <select
                    value={formData.documento_cantiere}
                    onChange={(e) => setFormData({ ...formData, documento_cantiere: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                      formData.documento_cantiere === 'Mancanti' 
                        ? 'bg-red-100 border-red-500 text-red-800' 
                        : formData.documento_cantiere === 'Fatto' 
                        ? 'bg-green-100 border-green-500 text-green-800'
                        : !formData.documento_cantiere 
                        ? 'bg-white border-gray-300 text-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="">Seleziona...</option>
                    <option value="Mancanti">Mancanti</option>
                    <option value="Fatto">Fatto</option>
                    <option value="Non previsto">Non previsto</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Materiale
                  </label>
                  <select
                    value={formData.materiale}
                    onChange={(e) => setFormData({ ...formData, materiale: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                      formData.materiale === 'Mancante' 
                        ? 'bg-red-100 border-red-500 text-red-800' 
                        : formData.materiale === 'Fatto' 
                        ? 'bg-green-100 border-green-500 text-green-800'
                        : !formData.materiale 
                        ? 'bg-white border-gray-300 text-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="">Seleziona...</option>
                    <option value="Non previsto">Non previsto</option>
                    <option value="Mancante">Mancante</option>
                    <option value="Fatto">Fatto</option>
                    <option value="Ordinato">Ordinato</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Acconto
                  </label>
                  <select
                    value={formData.acconto}
                    onChange={(e) => setFormData({ ...formData, acconto: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                      formData.acconto === 'Ok' 
                        ? 'bg-green-100 border-green-500 text-green-800'
                        : !formData.acconto 
                        ? 'bg-white border-gray-300 text-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="">Seleziona...</option>
                    <option value="Ok">Ok</option>
                    <option value="Non previsto">Non previsto</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Attrezzature a Noleggio
                  </label>
                  <select
                    value={formData.cestello}
                    onChange={(e) => setFormData({ ...formData, cestello: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                      formData.cestello === 'Mancante' 
                        ? 'bg-red-100 border-red-500 text-red-800' 
                        : formData.cestello === 'Fatto' 
                        ? 'bg-green-100 border-green-500 text-green-800'
                        : !formData.cestello 
                        ? 'bg-white border-gray-300 text-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="">Seleziona...</option>
                    <option value="Non previsto">Non previsto</option>
                    <option value="Mancante">Mancante</option>
                    <option value="Fatto">Fatto</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Viaggi e Hotel
                  </label>
                  <select
                    value={formData.viaggi_hotel}
                    onChange={(e) => setFormData({ ...formData, viaggi_hotel: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                      formData.viaggi_hotel === 'Mancante' 
                        ? 'bg-red-100 border-red-500 text-red-800' 
                        : formData.viaggi_hotel === 'Fatto' 
                        ? 'bg-green-100 border-green-500 text-green-800'
                        : !formData.viaggi_hotel 
                        ? 'bg-white border-gray-300 text-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="">Seleziona...</option>
                    <option value="Non previsto">Non previsto</option>
                    <option value="Mancante">Mancante</option>
                    <option value="Fatto">Fatto</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Avanzamento Lavoro
                  </label>
                  <select
                    value={formData.lavoro}
                    onChange={(e) => setFormData({ ...formData, lavoro: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                      formData.lavoro === 'In corso'
                        ? 'bg-blue-100 border-blue-500 text-blue-800'
                        : formData.lavoro === 'Programmato'
                        ? 'bg-indigo-100 border-indigo-500 text-indigo-800'
                        : formData.lavoro === 'Da programmare'
                        ? 'bg-purple-100 border-purple-500 text-purple-800'
                        : formData.lavoro === 'Fatto'
                        ? 'bg-green-100 border-green-500 text-green-800'
                        : !formData.lavoro 
                        ? 'bg-white border-gray-300 text-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="">Seleziona...</option>
                    <option value="In corso">In corso</option>
                    <option value="Programmato">Programmato</option>
                    <option value="Da programmare">Da programmare</option>
                    <option value="Fatto">Fatto</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Documentazione Tecnica Section */}
            <div className="bg-blue-10 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Documentazione Tecnica</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Disegno Definitivo
                  </label>
                  <select
                    value={formData.disegno_definitivo}
                    onChange={(e) => setFormData({ ...formData, disegno_definitivo: e.target.value })}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                      !formData.disegno_definitivo ? 'text-gray-400' : 'text-gray-900'
                    }`}
                  >
                    <option value="">Seleziona...</option>
                    <option value="Urgente">Urgente</option>
                    <option value="Di altro progettista">Di altro progettista</option>
                    <option value="Attendere">Attendere</option>
                    <option value="In attesa documenti cliente">In attesa documenti cliente</option>
                    <option value="Fatto">Fatto</option>
                    <option value="Non previsto">Non previsto</option>
                    <option value="Mancante">Mancante</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Firma Progetto
                  </label>
                  <select
                    value={formData.firma_progetto}
                    onChange={(e) => setFormData({ ...formData, firma_progetto: e.target.value })}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                      !formData.firma_progetto ? 'text-gray-400' : 'text-gray-900'
                    }`}
                  >
                    <option value="">Seleziona...</option>
                    <option value="Geom. Pasquale Iacolare">Geom. Pasquale Iacolare</option>
                    <option value="Ing. Francesco Profilato">Ing. Francesco Profilato</option>
                    <option value="Non previsto">Non previsto</option>
                    <option value="Non ABACO E.V.">Non ABACO E.V.</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Firma Progetto non ABACO E.V.
                  </label>
                  <input
                    type="text"
                    value={formData.firma_progetto_non_abaco}
                    onChange={(e) => setFormData({ ...formData, firma_progetto_non_abaco: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                      formData.firma_progetto === 'Non ABACO E.V.' 
                        ? 'border-gray-300 bg-white text-gray-900' 
                        : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                    placeholder="Inserisci nome per firma progetto"
                    disabled={formData.firma_progetto !== 'Non ABACO E.V.'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Relazione di Calcolo
                  </label>
                  <select
                    value={formData.relazione_calcolo}
                    onChange={(e) => setFormData({ ...formData, relazione_calcolo: e.target.value })}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                      !formData.relazione_calcolo ? 'text-gray-400' : 'text-gray-900'
                    }`}
                  >
                    <option value="">Seleziona...</option>
                    <option value="Urgente">Urgente</option>
                    <option value="Di altro progettista">Di altro progettista</option>
                    <option value="Attendere">Attendere</option>
                    <option value="In attesa documenti cliente">In attesa documenti cliente</option>
                    <option value="Fatto">Fatto</option>
                    <option value="Non previsto">Non previsto</option>
                    <option value="Mancante">Mancante</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Firma Relazione
                  </label>
                  <select
                    value={formData.firma_relazione}
                    onChange={(e) => setFormData({ ...formData, firma_relazione: e.target.value })}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                      !formData.firma_relazione ? 'text-gray-400' : 'text-gray-900'
                    }`}
                  >
                    <option value="">Seleziona...</option>
                    <option value="Ing. Giuliano Wolf">Ing. Giuliano Wolf</option>
                    <option value="Ing. Francesco Profilato">Ing. Francesco Profilato</option>
                    <option value="Non previsto">Non previsto</option>
                    <option value="Non ABACO E.V.">Non ABACO E.V.</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Firma Relazione non ABACO E.V.
                  </label>
                  <input
                    type="text"
                    value={formData.firma_relazione_non_abaco}
                    onChange={(e) => setFormData({ ...formData, firma_relazione_non_abaco: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                      formData.firma_relazione === 'Non ABACO E.V.' 
                        ? 'border-gray-300 bg-white text-gray-900' 
                        : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                    placeholder="Inserisci nome per firma relazione"
                    disabled={formData.firma_relazione !== 'Non ABACO E.V.'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dichiarazione Conf.
                  </label>
                  <select
                    value={formData.dichiarazione_conf}
                    onChange={(e) => setFormData({ ...formData, dichiarazione_conf: e.target.value })}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                      !formData.dichiarazione_conf ? 'text-gray-400' : 'text-gray-900'
                    }`}
                  >
                    <option value="">Seleziona...</option>
                    <option value="Urgente">Urgente</option>
                    <option value="Attendere">Attendere</option>
                    <option value="Fatto">Fatto</option>
                    <option value="Non previsto">Non previsto</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Autorizzazione Invio Documenti
                  </label>
                  <select
                    value={formData.autorizzazione_invio}
                    onChange={(e) => setFormData({ ...formData, autorizzazione_invio: e.target.value })}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                      !formData.autorizzazione_invio ? 'text-gray-400' : 'text-gray-900'
                    }`}
                  >
                    <option value="">Seleziona...</option>
                    <option value="Non autorizzato">Non autorizzato</option>
                    <option value="Autorizzato">Autorizzato</option>
                    <option value="Autorizzato e urgente">Autorizzato e urgente</option>
                    <option value="Non previsto">Non previsto</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Invio Documenti
                  </label>
                  <select
                    value={formData.invio_documenti}
                    onChange={(e) => setFormData({ ...formData, invio_documenti: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                      formData.invio_documenti === 'Fatto' 
                        ? 'bg-green-100 border-green-500 text-green-800'
                        : !formData.invio_documenti 
                        ? 'bg-white border-gray-300 text-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="">Seleziona...</option>
                    <option value="Fatto">Fatto</option>
                    <option value="Non previsto">Non previsto</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Fatturazione Pagamenti Section */}
            <div className="bg-yellow-10 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Fatturazione Pagamenti</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fatturazione Acconto
                  </label>
                  <select
                    value={formData.fatturazione_acconto}
                    onChange={(e) => setFormData({ ...formData, fatturazione_acconto: e.target.value })}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                      !formData.fatturazione_acconto ? 'text-gray-400' : 'text-gray-900'
                    }`}
                  >
                    <option value="">Seleziona...</option>
                    <option value="Fatto">Fatto</option>
                    <option value="Non previsto">Non previsto</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Verifica Pagamento Acconto
                  </label>
                  <select
                    value={formData.verifica_pagamento_acconto}
                    onChange={(e) => setFormData({ ...formData, verifica_pagamento_acconto: e.target.value })}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                      !formData.verifica_pagamento_acconto ? 'text-gray-400' : 'text-gray-900'
                    }`}
                  >
                    <option value="">Seleziona...</option>
                    <option value="Fatto">Fatto</option>
                    <option value="Non previsto">Non previsto</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fatturazione Saldo
                  </label>
                  <select
                    value={formData.fatturazione_saldo}
                    onChange={(e) => setFormData({ ...formData, fatturazione_saldo: e.target.value })}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                      !formData.fatturazione_saldo ? 'text-gray-400' : 'text-gray-900'
                    }`}
                  >
                    <option value="">Seleziona...</option>
                    <option value="Fatto">Fatto</option>
                    <option value="Non previsto">Non previsto</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Verifica Pagamento Saldo
                  </label>
                  <select
                    value={formData.verifica_pagamento_saldo}
                    onChange={(e) => setFormData({ ...formData, verifica_pagamento_saldo: e.target.value })}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                      !formData.verifica_pagamento_saldo ? 'text-gray-400' : 'text-gray-900'
                    }`}
                  >
                    <option value="">Seleziona...</option>
                    <option value="Fatto">Fatto</option>
                    <option value="Non previsto">Non previsto</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Note Section */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Note</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FileText className="h-4 w-4 inline mr-1" />
                  Note
                </label>
                <textarea
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Inserisci note aggiuntive..."
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors font-medium"
            >
              Annulla
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors flex items-center font-medium"
            >
              <Plus className="h-5 w-5 mr-2" />
              Crea Lavoro
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}