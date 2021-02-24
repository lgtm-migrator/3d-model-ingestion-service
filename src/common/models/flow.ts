import { Metadata } from '../../common/models/metadata';

export interface Flow {
  /**
   * Ingestion flow unique identifier
   */
  flowId: string;
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
