/* eslint-disable @typescript-eslint/naming-convention */
import faker from 'faker';
import { Flow } from '../../src/common/models/flow';
import { Job } from '../../src/common/models/job';
import { Metadata } from '../../src/common/models/metadata';
import { Model } from '../../src/common/models/model';

interface IntegrationMetadata extends Omit<Metadata, 'SourceDateStart' | 'SourceDateEnd'> {
  SourceDateStart: string;
  SourceDateEnd: string;
}

export const createUuid = (): string => {
  return faker.random.uuid();
};

export const createDate = (): Date => {
  return faker.date.past();
};

export const createPath = (): string => {
  return '/usr/share/nginx/downloads';
};

export const createMetadata = (): Metadata => {
  return {
    productId: faker.random.word(),
    productName: faker.random.word(),
    geographicArea: faker.random.word(),
    productVersion: 1,
    productType: '3DModel',
    description: faker.random.word(),
    classification: faker.random.word(),
    footprint: faker.random.word(),
    extentLowerLeft: faker.random.word(),
    extentUpperRight: faker.random.word(),
    SourceDateStart: createDate(),
    SourceDateEnd: createDate(),
    producerName: 'IDFMU',
    SRS: faker.random.word(),
    SRSOrigin: faker.random.word(),
    nominalResolution: faker.random.word(),
    accuracyLE90: faker.random.word(),
    horizontalAccuracyCE90: faker.random.word(),
    relativeAccuracyLE90: faker.random.word(),
    heightRangeFrom: 0,
    heightRangeTo: 0,
    sensor: [faker.random.word()],
    productionMethod: 'Photogrammetric',
    productionSystem: faker.random.word(),
  };
};

export const createFakeJob = (): Job => {
  return { jobId: createUuid(), path: createPath(), metadata: createMetadata(), status: 'In-Progress', created: new Date(), updated: new Date() };
};

export const createFakeFlow = (): Flow => {
  return { flowId: createUuid(), jobId: createUuid(), path: createPath(), metadata: createMetadata() };
};

export const createFakeModel = (): Model => {
  return { modelId: createUuid(), jobId: createUuid(), flowId: createUuid(), path: createPath(), metadata: createMetadata() };
};

export const convertToISOTimestamp = (metadata: Metadata): IntegrationMetadata => {
  const { SourceDateStart, SourceDateEnd, ...rest } = metadata;
  return { ...rest, SourceDateStart: SourceDateStart.toISOString(), SourceDateEnd: SourceDateEnd.toISOString() };
};
