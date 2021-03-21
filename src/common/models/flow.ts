import { Payload } from './payload';

export interface Flow extends Payload {
  /**
   * Ingestion flow unique identifier
   */
  flowId: string;
  /**
   * Ingestion job unique identifier
   */
  jobId: string;
}
