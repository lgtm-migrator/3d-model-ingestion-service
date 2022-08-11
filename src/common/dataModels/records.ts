import { Layer3DMetadata } from '@map-colonies/mc-model-types';

export type IPayload = Omit<Layer3DMetadata, 'productSource'>;
