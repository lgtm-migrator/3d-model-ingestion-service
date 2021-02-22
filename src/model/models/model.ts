import { Metadata } from './metadata';

export interface Model {
  /**
   * Ingestion model unique identifier
   */
  modelId: string;
  /**
   * Ingestion job unique identifier
   */
  jobId: string;
  /**
   * Files location path
   */
  path: string;
  /**
   * Metadata
   */
  metadata: Metadata;
}
