import { RequestHandler } from 'express';
import httpStatus from 'http-status-codes';
import { injectable, inject } from 'tsyringe';
import { Services } from '../../common/constants';
import { ILogger } from '../../common/interfaces';
import { Model } from '../../common/models/model';
import { ModelsManager } from '../models/modelsManager';

type CreateModelHandler = RequestHandler<undefined, Model, Model>;

@injectable()
export class ModelsController {
  public constructor(@inject(Services.LOGGER) private readonly logger: ILogger, private readonly manager: ModelsManager) {}

  public createModel: CreateModelHandler = async (req, res, next) => {
    try {
      const newModel = req.body;
      const createdModel = await this.manager.createModel(newModel);
      return res.status(httpStatus.CREATED).json(createdModel);
    } catch (error) {
      return next(error);
    }
  };
}
