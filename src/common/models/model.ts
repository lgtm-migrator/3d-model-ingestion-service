import { Metadata } from '../../common/models/metadata';

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
   * Ingestion flow unique identifier
   */
  flowId: string;
  /**
   * Files location path
   */
  path: string;
  /**
   * Metadata
   */
  metadata: Metadata;
}
