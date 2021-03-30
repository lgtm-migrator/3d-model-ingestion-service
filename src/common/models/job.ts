import { Payload } from './payload';

export interface Job extends Payload {
  /**
   * Ingestion job unique identifier
   */
  jobId: string;
  /**
   * Ingestion flow status
   */
  status: string;
  /**
   * Record creation date
   */
  created: Date;
  /**
   * Record last updated date
   */
  updated: Date;
}
