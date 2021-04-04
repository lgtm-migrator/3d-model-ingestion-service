import faker from 'faker';
import { Flow } from '../../src/common/models/flow';
import { Job } from '../../src/common/models/job';
import { Metadata } from '../../src/common/models/metadata';
import { Model } from '../../src/common/models/model';

interface IntegrationMetadata extends Omit<Metadata, 'insertDate' | 'creationDate' | 'validationDate' | 'timeBegin' | 'timeEnd'> {
  insertDate: string;
  creationDate: string;
  validationDate: string;
  timeBegin: string;
  timeEnd: string;
}

export const createUuid = (): string => {
  return faker.random.uuid();
};

export const createModelPath = (): string => {
  return '/tmp/tilesets/TilesetWithDiscreteLOD';
};

export const createMetadata = (): Metadata => {
  return {
    identifier: faker.random.uuid(),
    typeName: faker.random.word(),
    schema: faker.random.word(),
    mdSource: faker.random.word(),
    xml: faker.random.word(),
    anytext: faker.random.word(),
    insertDate: faker.date.past(),
    creationDate: faker.date.past(),
    validationDate: faker.date.past(),
    wktGeometry: faker.random.word(),
    title: faker.random.word(),
    producerName: 'IDFMU',
    description: faker.random.word(),
    type: faker.random.word(),
    classification: faker.random.word(),
    srs: faker.random.word(),
    projectName: faker.random.word(),
    version: faker.random.word(),
    centroid: faker.random.word(),
    footprint: faker.random.word(),
    timeBegin: faker.date.past(),
    timeEnd: faker.date.past(),
    sensorType: faker.random.word(),
    region: faker.random.word(),
    nominalResolution: faker.random.word(),
    accuracyLE90: faker.random.word(),
    horizontalAccuracyCE90: faker.random.word(),
    relativeAccuracyLE90: faker.random.word(),
    estimatedPrecision: faker.random.word(),
    measuredPrecision: faker.random.word(),
    links: faker.random.word(),
  };
};

export const createFakeJob = (): Job => {
  return {
    jobId: createUuid(),
    modelPath: createModelPath(),
    metadata: createMetadata(),
    status: 'Pending',
    created: new Date(),
    updated: new Date(),
  };
};

export const createFakeFlow = (): Flow => {
  return { flowId: createUuid(), jobId: createUuid(), modelPath: createModelPath(), metadata: createMetadata() };
};

export const createFakeModel = (): Model => {
  return { modelId: createUuid(), jobId: createUuid(), flowId: createUuid(), modelPath: createModelPath(), metadata: createMetadata() };
};

export const convertTimestampToISOString = (metadata: Metadata): IntegrationMetadata => {
  const { insertDate, creationDate, validationDate, timeBegin, timeEnd, ...rest } = metadata;
  return {
    ...rest,
    insertDate: insertDate.toISOString(),
    creationDate: creationDate ? creationDate.toISOString() : '',
    validationDate: validationDate ? validationDate.toISOString() : '',
    timeBegin: timeBegin ? timeBegin.toISOString() : '',
    timeEnd: timeEnd ? timeEnd.toISOString() : '',
  };
};
