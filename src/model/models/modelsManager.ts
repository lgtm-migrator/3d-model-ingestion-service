import axios from 'axios';
import { inject, injectable } from 'tsyringe';
import { Entities, Services } from '../../common/constants';
import { ILogger } from '../../common/interfaces';
import { Job } from './job';
import { Model } from './model';

@injectable()
export class ModelsManager {
  public constructor(@inject(Services.LOGGER) private readonly logger: ILogger) {}

  public async create(entity: string, url: string, model: Model): Promise<Model> {
    this.logger.log('info', `Create a new ${entity}: ${JSON.stringify(model)}`);
    const created = await this.post(url, model);
    if (entity == Entities.JOB) {
      model.jobId = (created as Job).jobId;
    }
    return model;
  }

  private async post(url: string, data: Model): Promise<unknown> {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url,
        data,
      }).then(
        (response) => {
          resolve(response.data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
