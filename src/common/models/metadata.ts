export interface Metadata {
  productName: string;
  productVersion: string;
  productType: string;
  description?: string;
  creationDate?: string;
  sourceStartDate?: string;
  sourceEndDate?: string;
  minResolutionMeter?: number;
  maxResolutionMeter?: number;
  minResolutionDeg?: number;
  maxResolutionDeg?: number;
  nominalResolution?: string;
  minAccuracyCE90: number;
  maxAccuracyCE90: number;
  accuracyLE90: number;
  accuracySE90?: number;
  relativeAccuracyLE90?: number;
  visualAccuracy?: number;
  sensorType: string;
  footprint?: string;
  heightRangeFrom?: number;
  heightRangeTo?: number;
  srsId: bigint;
  srsName: string;
  srsOrigin?: string; // TODO: create struct representing it as a point
  region: string;
  classification: string;
  compartmentalization?: string;
  productionSystem: string;
  productionSystemVer: string;
  producerName: string;
  productionMethod?: string;
  minFlightAlt?: number;
  maxFlightAlt?: number;
  geographicArea?: string;
  boundingBox: string;
}
