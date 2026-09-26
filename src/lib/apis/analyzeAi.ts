import { httpClient } from "../axios/httpClinet";

export interface AnalyzeRequest {
  location: {
    latitude: number;
    longitude: number;
  };
  analysisPeriod: {
    startDate: string;
    endDate: string;
  };
  crop: {
    currentCrop: string;
    consideringCrops: string[];
  };
  farmerPriority: {
    waterAvailability: string;
    riskTolerance: string;
    priority: string;
  };
  soil: {
    type: string;
    ph: number;
  };
}

export interface WhyThisResultItem {
  factor: string;
  observation: string;
  impact: string;
}

export interface ClimateSummary {
  temperature: {
    mean: number;
    max: number;
  };
  rainfall: {
    recent: number;
    trend: string;
  };
  soilMoisture: {
    surface: number;
    rootzone: number;
    trend: string;
  };
}

export interface RiskItem {
  type: string;
  level: string;
  reason: string;
}

export interface Recommendation {
  primaryCrop: string;
  alternativeCrops: string[];
  plantingWindow: {
    start: string;
    end: string;
  };
  waterRequirement: string;
  riskLevel: string;
}

export interface AnalysisData {
  analysisId: string;
  location: {
    latitude: number;
    longitude: number;
  };
  analysisPeriod: {
    startDate: string;
    endDate: string;
  };
  recommendation: Recommendation;
  whyThisResult: WhyThisResultItem[];
  climateSummary: ClimateSummary;
  risks: RiskItem[];
  farmerAdvice: string[];
  dataSources: string[];
  knowledgeSources: string[];
  generatedBy: {
    provider: string;
    model: string;
  };
}

export interface AnalyzeResponse {
  success: boolean;
  message: string;
  data: AnalysisData;
}

export async function analyzeClimateData(payload: AnalyzeRequest): Promise<AnalyzeResponse> {
  return httpClient.post<AnalyzeResponse>("/ai/analyze", payload, {
    timeout: 90000,
  });
}
