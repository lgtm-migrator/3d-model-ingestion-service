import { Metadata } from './metadata';

export interface Payload {
  /**
   * Model files location path
   */
  modelPath: string;
  /**
   * Metadata
   */
  metadata: Metadata;
}
