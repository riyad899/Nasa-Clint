import { httpClient } from "../axios/httpClinet";

export interface AnalyzeRequest {
  location: {
    latitude: number;
    longitude: number;
    district: string;
  };
  crop: {
    cropType: string;
    farmingMethod: string;
  };
  analysis: {
    type: string;
    baselineStartYear: number;
    baselineEndYear: number;
    recentStartYear: number;
    recentEndYear: number;
  };
  language: "bn" | "en";
}

export interface AnnualOnset {
  year: number;
  onsetDate: string;
  dayOfYear: number;
  rainfallTotalMm: number;
  confidence: string;
}

export interface OnsetPeriod {
  startYear: number;
  endYear: number;
  annualOnsets: AnnualOnset[];
  validYears: number;
  medianDayOfYear: number;
  p25DayOfYear: number;
  p75DayOfYear: number;
}

export interface OnsetAnalysisData {
  analysisId: string;
  location: AnalyzeRequest["location"];
  crop: AnalyzeRequest["crop"];
  method: {
    season: string;
    minimumAccumulatedRainfallMm: number;
    accumulationDays: number;
    confirmationWindowDays: number;
    minimumConfirmationRainyDays: number;
  };
  baseline: OnsetPeriod;
  recent: OnsetPeriod;
  shift: {
    medianDays: number;
    direction: string;
    p25ToP75Days: {
      lower: number;
      upper: number;
    };
  };
  transplantingWindow: {
    start: string;
    end: string;
    confidence: string;
  };
  explanation: string;
  farmerGuidance: string[];
  dataSources: string[];
  warnings: string[];
}

export interface AnalyzeResponse {
  success: boolean;
  message: string;
  data: OnsetAnalysisData;
}

export interface TransparencySource {
  id: string;
  analysisId: string;
  source: string;
  provider: string;
  dataset: string;
  endpoint: string;
  requestParameters: Record<string, string | number>;
  variables: string[];
  units: Record<string, string>;
  temporalResolution: string;
  spatialResolution: string;
  fetchStatus: string;
  responseTimeMs: number | null;
  requestedStart: string;
  requestedEnd: string;
  recordCount: number;
  coverage: unknown;
  missingData: unknown;
  sourceLink: string;
  sourceVersion: string;
  errorMessage: string | null;
}

export interface TransparencyYearlyCalculation {
  id: string;
  analysisId: string;
  periodType: string;
  year: number;
  onsetDate: string;
  dayOfYear: number;
  rainfallTotal: number;
  valid: boolean;
  missingDays: number;
  confidence: string;
  calculation: Record<string, string | number>;
}

export interface TransparencyObservation {
  id: string;
  source: string;
  observedAt: string;
  variable: string;
  value: number;
  unit: string;
  isValid: boolean;
  qualityNote: string | null;
}

export interface TransparencyResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    algorithmVersion: string;
    status: string;
    requestedAt: string;
    completedAt: string;
    location: AnalyzeRequest["location"];
    crop: AnalyzeRequest["crop"];
    farmingMethod: string;
    farmerPriority: unknown;
    baselinePeriod: { startYear: number; endYear: number };
    recentPeriod: { startYear: number; endYear: number };
    methodology: {
      rule: string;
      formulas: Record<string, string>;
      uncertaintyMethod: string;
    };
    recommendation: unknown;
    aiExplanation: {
      source: string;
      explanation: string;
      provider: string | null;
      model: string | null;
      promptVersion: string | null;
      fallback: boolean;
    };
    warnings: string[];
    sources: TransparencySource[];
    observations: TransparencyObservation[];
    yearlyCalculations: TransparencyYearlyCalculation[];
    auditLogs: Array<{
      id: string;
      analysisId: string;
      event: string;
      details: Record<string, string | number>;
      createdAt: string;
    }>;
    createdAt: string;
    updatedAt: string;
  } | null;
  error: string | null;
}

export interface ObservationsResponse {
  success: boolean;
  message: string;
  data: {
    items: TransparencyObservation[];
    pagination: {
      page: number;
      pageSize: number;
      total: number;
      totalPages: number;
    };
  } | null;
  error: string | null;
}

export async function analyzeClimateData(payload: AnalyzeRequest): Promise<AnalyzeResponse> {
  return httpClient.post<AnalyzeResponse>("/ai/analyze-aman-onset", payload, {
    timeout: 90000,
  });
}

export async function getAnalysisTransparency(analysisId: string): Promise<TransparencyResponse> {
  return httpClient.get<TransparencyResponse>(`/analyses/${encodeURIComponent(analysisId)}`);
}

export async function getAnalysisObservations(
  analysisId: string,
  page = 1,
  pageSize = 50
): Promise<ObservationsResponse> {
  return httpClient.get<ObservationsResponse>(`/analyses/${encodeURIComponent(analysisId)}/observations`, {
    params: { source: "POWER", variable: "PRECTOTCORR", page, pageSize },
  });
}
