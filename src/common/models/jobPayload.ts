import { Payload } from './payload';

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
  parameters: Payload;
  /**
   * Ingestion flow status
   */
  status?: string;
  /**
   * Ingestion flow progress
   */
  percentage?: number;
}
