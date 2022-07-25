import { Payload } from './payload';
import { PayloadRequest } from './request';

export interface Job {
  /**
   * Ingestion job unique identifier
   */
  id: string;
  /**
   * Model unique identifier
   */
  resourceId: string;
  /**
   * Model version
   */
  version: string;
  /**
   * Model type
   */
  type: string;
  /**
   * Model description
   */
  description?: string;
  /**
   * Job parameters
   */
  parameters: PayloadRequest;
  /**
   * Record creation date
   */
  creationTime?: Date;
  /**
   * Record last updated date
   */
  updateTime?: Date;
  /**
   * Ingestion flow status
   */
  status: string;
  /**
   * Ingestion flow progress
   */
  percentage: number;
  /**
   * Reason of failure
   */
  reason?: string;
  /**
   * Sub jobs
   */
  tasks?: Record<string, never>[];
}
