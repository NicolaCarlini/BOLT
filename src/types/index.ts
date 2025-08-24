export interface Job {
  job_id: number;
  client: string | null;
  job_name: string | null;
  comune: string | null;
  provincia: string | null;
  data_appuntamento: string | null;
  created_at: string;
  provenienza: string | null;
  telefono: string | null;
  email: string | null;
  tipo_intervento: string | null;
  progetto_preliminare: 'Urgente' | 'Attendere' | 'Fatto' | 'Non previsto' | 'Mancante' | 'Fatto ABACO E.V.' | 'Fatto altro progettista' | null;
  documento_cantiere: 'Urgente' | 'Attendere' | 'Fatto' | 'Non previsto' | 'Mancanti' | null;
  materiale: 'Non previsto' | 'Mancante' | 'Fatto' | 'Ordinato' | null;
  cestello: 'Urgente' | 'Attendere' | 'Fatto' | 'Non previsto' | 'Mancante' | null;
  viaggi_hotel: 'Urgente' | 'Attendere' | 'Fatto' | 'Non previsto' | null;
  viaggi_hotel: 'Urgente' | 'Attendere' | 'Fatto' | 'Non previsto' | 'Mancante' | null;
  lavoro: 'Urgente' | 'Attendere' | 'Fatto' | 'Non previsto' | 'In corso' | 'Programmato' | 'Da programmare' | null;
  disegno_definitivo: 'Urgente' | 'Di altro progettista' | 'Attendere' | 'In attesa documenti cliente' | 'Fatto' | 'Non previsto' | 'Mancante' | null;
  firma_progetto: 'Geom. Pasquale Iacolare' | 'Ing. Francesco Profilato' | 'Non previsto' | 'Non ABACO E.V.' | null;
  relazione_calcolo: 'Urgente' | 'Di altro progettista' | 'Attendere' | 'In attesa documenti cliente' | 'Fatto' | 'Non previsto' | 'Mancante' | null;
  firma_relazione: 'Ing. Giuliano Wolf' | 'Ing. Francesco Profilato' | 'Non previsto' | null;
  firma_relazione: 'Ing. Giuliano Wolf' | 'Ing. Francesco Profilato' | 'Non previsto' | 'Non ABACO E.V.' | null;
  dichiarazione_conf: 'Urgente' | 'Attendere' | 'Fatto' | 'Non previsto' | null;
  autorizzazione_invio: 'Non autorizzato' | 'Autorizzato' | 'Autorizzato e urgente' | 'Non previsto' | null;
  invio_documenti: 'Fatto' | 'Non previsto' | 'Urgente' | 'Attendere' | null;
  note: string | null;
  fatturazione_acconto: 'Fatto' | 'Non previsto' | 'Urgente' | 'Attendere' | null;
  verifica_pagamento_acconto: 'Fatto' | 'Non previsto' | 'Urgente' | 'Attendere' | null;
  fatturazione_saldo: 'Fatto' | 'Non previsto' | 'Urgente' | 'Attendere' | null;
  verifica_pagamento_saldo: 'Fatto' | 'Non previsto' | 'Urgente' | 'Attendere' | null;
  attivita: 'Servizio tecnico' | 'Fornitura' | 'Installazione' | 'Ispezione' | null;
  coordinate: string | null;
  firma_progetto_non_abaco: string | null;
  firma_relazione_non_abaco: string | null;
  giornate_previste: number | null;
  priorita: 'Urgente' | 'Non urgente' | null;
  referente: string | null;
}

export interface FilterState {
  client: string;
  job_name: string;
  comune: string;
  provincia: string;
  attivita: string;
  dateStart: string;
  dateEnd: string;
}

export type SortField = 'client' | 'job_name' | 'comune' | 'provincia' | 'data_appuntamento';
export type SortDirection = 'asc' | 'desc';