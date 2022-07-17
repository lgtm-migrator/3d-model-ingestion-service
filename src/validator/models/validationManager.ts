import { inject, injectable } from 'tsyringe';
import { Logger } from '@map-colonies/js-logger';
import { SERVICES } from '../../common/constants';
import { IConfig } from '../../common/interfaces';
import { Payload } from '../../common/models/payload';
import { BadPath } from '../../model/controllers/errors';

@injectable()
export class ValidationManager {
  public constructor(@inject(SERVICES.CONFIG) private readonly config: IConfig, @inject(SERVICES.LOGGER) private readonly logger: Logger) {}

  public validateModelPath(payload: Payload): Payload {
    const basePath = this.config.get<string>('paths.basePath');
    const mountPath = this.config.get<string>('paths.mountPath');
    if (payload['modelPath'].includes(basePath)) {
      const newModelPath = payload['modelPath'].replace(basePath + '\\', mountPath + '/');
      payload['modelPath'] = newModelPath;
      return payload;
    }
    throw new BadPath('Unknown model path- the model isnt in the agreed folder');
  }
}
