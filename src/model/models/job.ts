import { Metadata } from './metadata';

export interface Job {
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
