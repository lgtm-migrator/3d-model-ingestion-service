import { Payload } from './payload';

export interface Model extends Payload {
  /**
   * Ingestion model unique identifier
   */
  modelId: string;
  /**
   * Ingestion job unique identifier
   */
  jobId: string;
  /**
   * Ingestion flow unique identifier
   */
  flowId: string;
}
