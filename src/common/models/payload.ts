import { Layer3DMetadata } from '@map-colonies/mc-model-types';
import { IPayload } from '../dataModels/records';

export interface Payload {
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
  metadata: IPayload;
}
