import { PayloadRequest } from './request';

export interface JobPayload {
  /**
   * Model unique identifier
   */
  resourceId: string;
  /**
   * Model version
   */
  version?: string;
  /**
   * Model type
   */
  type?: string;
  /**
   * Model description
   */
  description?: string;
  /**
   * Job parameters
   */
  parameters: PayloadRequest;
  /**
   * Ingestion flow status
   */
  status?: string;
  /**
   * Ingestion flow progress
   */
  percentage?: number;

  tasks?: string[];
}
