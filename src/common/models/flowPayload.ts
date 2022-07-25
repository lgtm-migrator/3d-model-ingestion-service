import { Payload } from './payload';
import { PayloadRequest } from './request';

export interface FlowPayload extends PayloadRequest {
  /**
   * Ingestion job unique identifier
   */
  jobId: string;
}
