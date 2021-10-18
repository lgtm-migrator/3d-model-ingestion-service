import RandExp from 'randexp';
import faker from 'faker';
import { Flow } from '../../src/common/models/flow';
import { Job } from '../../src/common/models/job';
import { JobPayload } from '../../src/common/models/jobPayload';
import { Metadata } from '../../src/common/models/metadata';
import { Model } from '../../src/common/models/model';

const srsOriginHelper = new RandExp('^\\(([-+]?(0|[1-9]\\d*)(\\.\\d+)?;){2}[-+]?(0|[1-9]\\d*)(\\.\\d+)?\\)$').gen();
const classificationHelper = new RandExp('^[0-9]$').gen();
const productBoundingBoxHelper = new RandExp('^([-+]?(0|[1-9]\\d*)(\\.\\d+)?,){3}[-+]?(0|[1-9]\\d*)(\\.\\d+)?$').gen();
const listOfRandomWords = ['avi', 'אבי', 'lalalalala', 'וןםפ'];
const maxResolutionMeter = 8000;
const maxAbsoluteAccuracyLEP90 = 999;
const maxAccuracySE90 = 250;
const maxRelativeAccuracyLEP90 = 100;
const maxVisualAccuracy = 100;

// interface IntegrationMetadata extends Omit<Metadata, 'insertDate' | 'creationDate' | 'validationDate' | 'timeBegin' | 'timeEnd'> {
//   insertDate: string;
//   creationDate: string;
//   validationDate: string;
//   timeBegin: string;
//   timeEnd: string;
// }

export const createUuid = (): string => {
  return faker.random.uuid();
};

export const createModelPath = (): string => {
  return '/tmp/tilesets/TilesetWithDiscreteLOD';
};

export const createTilesetFilename = (): string => {
  return 'tileset.json';
};

export const createMetadata = (): Metadata => {
  return {
    //identifier: faker.random.uuid(),
    //insertDate: faker.date.past(),

    // type: faker.random.word(),
    // typename: faker.random.word(),
    // schema: faker.random.word(),
    // mdSource: faker.random.word(),
    // xml: faker.random.word(),
    // anytext: faker.random.word(),

    productName: Math.floor(Math.random() * listOfRandomWords.length).toString(),
    productVersion: Math.floor(Math.random() * listOfRandomWords.length).toString(),
    productType: faker.random.word(),
    description: Math.floor(Math.random() * listOfRandomWords.length).toString(),
    creationDate: faker.date.past().toISOString(),
    sourceDateStart: faker.date.past().toISOString(),
    sourceDateEnd: faker.date.past().toISOString(),
    minResolutionMeter: faker.random.number(maxResolutionMeter),
    maxResolutionMeter: faker.random.number(maxResolutionMeter),
    nominalResolution: faker.random.number(),
    maxAccuracyCE90: faker.random.number(),
    absoluteAccuracyLEP90: faker.random.number(maxAbsoluteAccuracyLEP90),
    accuracySE90: faker.random.number(maxAccuracySE90),
    relativeAccuracyLEP90: faker.random.number(maxRelativeAccuracyLEP90),
    visualAccuracy: faker.random.number(maxVisualAccuracy),
    sensors: faker.random.word(),
    footprint: faker.random.word(),
    heightRangeFrom: faker.random.number(),
    heightRangeTo: faker.random.number(),
    srsId: faker.random.number(),
    srsName: faker.random.word(),
    srsOrigin: srsOriginHelper,
    region: faker.random.word(),
    classification: classificationHelper,
    compartmentalization: faker.random.word(),
    productionSystem: faker.random.word(),
    productionSystemVer: Math.floor(Math.random() * listOfRandomWords.length).toString(),
    producerName: faker.random.word(),
    productionMethod: faker.random.word(),
    minFlightAlt: faker.random.number(),
    maxFlightAlt: faker.random.number(),
    geographicArea: faker.random.word(),
    productBoundingBox: productBoundingBoxHelper,
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
