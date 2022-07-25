import { Layer3DMetadata } from '@map-colonies/mc-model-types';
import { Payload } from './payload';
import { PayloadRequest } from './request';

export interface Model extends PayloadRequest {
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
