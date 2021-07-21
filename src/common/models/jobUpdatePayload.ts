export interface JobUpdatePayload {
  /**
   * Ingestion flow status
   */
  status: string;
  /**
   * Ingestion flow failure reason
   */
  reason?: string;
}
