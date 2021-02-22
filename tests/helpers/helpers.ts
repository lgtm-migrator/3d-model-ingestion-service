/* eslint-disable @typescript-eslint/naming-convention */
import faker from 'faker';
import { Job } from '../../src/model/models/job';
import { Metadata } from '../../src/model/models/metadata';
import { Model } from '../../src/model/models/model';

export const createUuid = (): string => {
  return faker.random.uuid();
};

export const createPath = (): string => {
  return '/usr/share/nginx/downloads';
};

export const createDate = (): Date => {
  return faker.date.past();
};

export const createMetadata = (): Metadata => {
  return {
    productId: 'string',
    productName: 'string',
    geographicArea: 'string',
    productVersion: 1,
    productType: '3DModel',
    description: 'string',
    classification: 'string',
    footprint: 'string',
    extentLowerLeft: 'string',
    extentUpperRight: 'string',
    SourceDateStart: createDate(),
    SourceDateEnd: createDate(),
    producerName: 'IDFMU',
    SRS: 'string',
    SRSOrigin: 'string',
    nominalResolution: 'string',
    accuracyLE90: 'string',
    horizontalAccuracyCE90: 'string',
    relativeAccuracyLE90: 'string',
    heightRangeFrom: 0,
    heightRangeTo: 0,
    sensor: ['string'],
    productionMethod: 'Photogrammetric',
    productionSystem: 'string',
  };
};

export const createFakeJob = (): Job => {
  return { jobId: createUuid(), path: createPath(), metadata: createMetadata(), status: 'In-Progress', created: new Date(), updated: new Date() };
};

export const createFakeModel = (): Model => {
  return { jobId: createUuid(), modelId: createUuid(), path: createPath(), metadata: createMetadata() };
};
