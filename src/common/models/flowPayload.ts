import { Payload } from './payload';

export interface FlowPayload extends Payload {
  /**
   * Ingestion job unique identifier
   */
  jobId: string;
}
