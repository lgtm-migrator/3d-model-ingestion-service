export interface Metadata {
  productName: string;
  productVersion: string;
  productType: string;
  description?: string;
  creationDate?: string;
  sourceDateStart: string;
  sourceDateEnd: string;
  minResolutionMeter?: number;
  maxResolutionMeter?: number;
  nominalResolution?: number;
  maxAccuracyCE90: number;
  absoluteAccuracyLEP90: number;
  accuracySE90?: number;
  relativeAccuracyLEP90?: number;
  visualAccuracy?: number;
  sensors: string;
  footprint?: string;
  heightRangeFrom?: number;
  heightRangeTo?: number;
  srsId: number;
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
  productBoundingBox: string;
}
