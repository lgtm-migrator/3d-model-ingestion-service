import { RequestHandler } from 'express';
import httpStatus from 'http-status-codes';
import { injectable, inject } from 'tsyringe';
import { Logger } from '@map-colonies/js-logger';
import { SERVICES } from '../../common/constants';
import { Model } from '../../common/models/model';
import { Payload } from '../../common/models/payload';
import { ModelsManager } from '../models/modelsManager';

type CreateModelHandler = RequestHandler<undefined, Model, Payload>;

@injectable()
export class ModelsController {
  public constructor(@inject(SERVICES.LOGGER) private readonly logger: Logger, private readonly manager: ModelsManager) {}

  public createModel: CreateModelHandler = async (req, res, next) => {
    try {
      const newModel = req.body;
      const createdModel = await this.manager.createModel(newModel);
      return res.status(httpStatus.CREATED).json(createdModel);
    } catch (error) {
      this.logger.error({ msg: 'Failed in ingesting a new model' });
      return next(error);
    }
  };
}
