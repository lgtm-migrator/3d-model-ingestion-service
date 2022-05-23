import RandExp from 'randexp';
import {randNumber,randPastDate,randUuid, randWord} from '@ngneat/falso';
import { Geometry } from 'geojson';
import { Flow } from '../../src/common/models/flow';
import { Job } from '../../src/common/models/job';
import { JobPayload } from '../../src/common/models/jobPayload';
import { Metadata } from '../../src/common/models/metadata';
import { Model } from '../../src/common/models/model';

const srsOriginHelper = new RandExp('^\\(([-]?(0|[1-9]\\d*)(\\.\\d+)?;){2}[-]?(0|[1-9]\\d*)(\\.\\d+)?\\)$').gen();
const classificationHelper = new RandExp('^[0-9]$').gen();
const listOfRandomWords = ['avi', 'אבי', 'lalalalala', 'וןםפ'];
const maxResolutionMeter = 8000;
const maxAbsoluteAccuracyLEP90 = 999;
const maxAccuracySE90 = 250;
const maxRelativeAccuracyLEP90 = 100;
const maxVisualAccuracy = 100;
const minX = 1;
const minY = 2;
const maxX = 3;
const maxY = 4;
const exampleGeometry = {
  type: 'Polygon',
  coordinates: [
    [
      [minX, minY],
      [maxX, minY],
      [maxX, maxY],
      [minX, maxY],
      [minX, minY],
    ],
  ],
} as Geometry;

// interface IntegrationMetadata extends Omit<Metadata, 'insertDate' | 'creationDate' | 'validationDate' | 'timeBegin' | 'timeEnd'> {
//   insertDate: string;
//   creationDate: string;
//   validationDate: string;
//   timeBegin: string;
//   timeEnd: string;
// }

export const createUuid = (): string => {
  return randUuid();
};

export const createModelPath = (): string => {
  return '\\\\tmp\\tilesets\\TilesetWithDiscreteLOD';
};

export const createMountedModelPath = (): string => {
  return '/mnt/mimi/libot/TilesetWithDiscreteLOD';
};
export const createWrongModelPath = (): string => {
  return '/avi/meow/TilesetWithDiscreteLOD';
};

export const createTilesetFilename = (): string => {
  return 'tileset.json';
};

export const createMetadata = (): Metadata => {
  return {
    productId: Math.floor(Math.random() * listOfRandomWords.length).toString(),
    productName: Math.floor(Math.random() * listOfRandomWords.length).toString(),
    productType: randWord(),
    description: Math.floor(Math.random() * listOfRandomWords.length).toString(),
    creationDate: randPastDate().toISOString(),
    sourceDateStart: randPastDate().toISOString(),
    sourceDateEnd: randPastDate().toISOString(),
    minResolutionMeter: randNumber({min:0,max:maxResolutionMeter}),
    maxResolutionMeter: randNumber({min:0,max:maxResolutionMeter}),
    nominalResolution: randNumber(),
    maxAccuracyCE90: randNumber(),
    absoluteAccuracyLEP90: randNumber({min:0,max:maxAbsoluteAccuracyLEP90}),
    accuracySE90: randNumber({min:0,max:maxAccuracySE90}),
    relativeAccuracyLEP90: randNumber({min:0,max:maxRelativeAccuracyLEP90}),
    visualAccuracy: randNumber({min:0,max:maxVisualAccuracy}),
    sensors: randWord(),
    footprint: exampleGeometry,
    heightRangeFrom: randNumber(),
    heightRangeTo: randNumber(),
    srsId: randNumber(),
    srsName: randWord(),
    srsOrigin: srsOriginHelper,
    region: randWord(),
    classification: classificationHelper,
    compartmentalization: randWord(),
    productionSystem: randWord(),
    productionSystemVer: Math.floor(Math.random() * listOfRandomWords.length).toString(),
    producerName: randWord(),
    productionMethod: randWord(),
    minFlightAlt: randNumber(),
    maxFlightAlt: randNumber(),
    geographicArea: randWord(),
  };
};

export const createInvalidMetadata = (): unknown => {
  return {
    productId: Math.floor(Math.random() * listOfRandomWords.length).toString(),
    productName: Math.floor(Math.random() * listOfRandomWords.length).toString(),
    // productVersion: faker.random.number(maxResolutionMeter),
    productType: randWord(),
    description: Math.floor(Math.random() * listOfRandomWords.length).toString(),
    creationDate: randPastDate().toISOString(),
    sourceDateStart: randPastDate().toISOString(),
    sourceDateEnd: randPastDate().toISOString(),
    minResolutionMeter: randNumber({min:0,max:maxResolutionMeter}),
    maxResolutionMeter: randNumber({min:0,max:maxResolutionMeter}),
    nominalResolution: randNumber(),
    maxAccuracyCE90: randNumber(),
    absoluteAccuracyLEP90: randNumber({min:0,max:maxAbsoluteAccuracyLEP90}),
    accuracySE90: randNumber({min:0,max:maxAccuracySE90}),
    relativeAccuracyLEP90: randNumber({min:0,max:maxRelativeAccuracyLEP90}),
    visualAccuracy: randNumber({min:0,max:maxVisualAccuracy}),
    sensors: randWord(),
    footprint: 1,
    heightRangeFrom: randNumber(),
    heightRangeTo: randNumber(),
    srsId: randNumber(),
    srsName: randWord(),
    srsOrigin: srsOriginHelper,
    region: randWord(),
    classification: classificationHelper,
    compartmentalization: randWord(),
    productionSystem: randWord(),
    productionSystemVer: Math.floor(Math.random() * listOfRandomWords.length).toString(),
    producerName: randWord(),
    productionMethod: randWord(),
    minFlightAlt: randNumber(),
    maxFlightAlt: randNumber(),
    geographicArea: randWord(),
  };
};

export const createFakeJobPayload = (): JobPayload => {
  return {
    resourceId: createUuid(),
    parameters: {
      modelPath: createModelPath(),
      tilesetFilename: createTilesetFilename(),
      metadata: createMetadata(),
    },
  };
};

export const createFakeJob = (payload: JobPayload): Job => {
  return {
    id: createUuid(),
    resourceId: payload.resourceId,
    parameters: payload.parameters,
    status: 'Pending',
    version: '1',
    type: '3D',
    description: '3D Model Ingestion',
    percentage: 0,
  };
};

export const createFakeFlow = (): Flow => {
  return {
    flowId: createUuid(),
    jobId: createUuid(),
    modelPath: createModelPath(),
    tilesetFilename: createTilesetFilename(),
    metadata: createMetadata(),
  };
};

export const createFakeModel = (): Model => {
  return {
    modelId: createUuid(),
    jobId: createUuid(),
    flowId: createUuid(),
    modelPath: createModelPath(),
    tilesetFilename: createTilesetFilename(),
    metadata: createMetadata(),
  };
};

// export const convertTimestampToISOString = (metadata: Metadata): IntegrationMetadata => {
//   const { insertDate, creationDate, validationDate, timeBegin, timeEnd, ...rest } = metadata;
//   return {
//     ...rest,
//     insertDate: insertDate.toISOString(),
//     creationDate: creationDate ? creationDate.toISOString() : '',
//     validationDate: validationDate ? validationDate.toISOString() : '',
//     timeBegin: timeBegin ? timeBegin.toISOString() : '',
//     timeEnd: timeEnd ? timeEnd.toISOString() : '',
//   };
// };
