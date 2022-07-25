import { Layer3DMetadata } from '@map-colonies/mc-model-types';

export interface PayloadRequest {
  /**
   * Model files location path
   */
  modelPath: string;
  /**
   * Model tileset filename
   */
  tilesetFilename: string;
  /**
   * Metadata
   */
  metadata: Layer3DMetadata;
}