import { FlowPayload } from './flowPayload';

export interface Flow extends FlowPayload {
  /**
   * Ingestion flow unique identifier
   */
  flowId: string;
}
