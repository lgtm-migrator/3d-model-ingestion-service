import { Metadata } from './metadata';

export interface Payload {
  /**
   * Ingestion job unique identifier
   */
  jobId?: string;
  /**
   * Model files location path
   */
  modelPath: string;
  /**
   * Metadata
   */
  metadata: Metadata;
}
