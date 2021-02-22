import { RequestHandler } from 'express';
import httpStatus from 'http-status-codes';
import { v4 as uuid } from 'uuid';
import { injectable, inject } from 'tsyringe';
import { Entities, Services } from '../../common/constants';
import { IConfig, ILogger } from '../../common/interfaces';

import { ModelsManager } from '../models/modelsManager';
import { Model } from '../models/model';

type CreateModelHandler = RequestHandler<undefined, Model, Model>;

@injectable()
export class ModelsController {
  public constructor(
    @inject(Services.CONFIG) private readonly config: IConfig,
    @inject(Services.LOGGER) private readonly logger: ILogger,
    @inject(ModelsManager) private readonly manager: ModelsManager
  ) {}

  public createModel: CreateModelHandler = async (req, res, next) => {
    try {
      this.logger.log('info', 'Create a new model started');
      const jobUrl = this.config.get<string>(Entities.JOB + 'Url');
      const flowUrl = this.config.get<string>(Entities.FLOW + 'Url');
      let newModel = req.body;
      newModel = await this.manager.create(Entities.JOB, jobUrl, newModel);
      newModel = await this.manager.create(Entities.FLOW, flowUrl, newModel);
      newModel.modelId = uuid();
      return res.status(httpStatus.CREATED).json(newModel);
    } catch (error) {
      return next(error);
    }
  };
}
