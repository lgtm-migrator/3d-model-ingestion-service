import { inject, injectable } from 'tsyringe';
import { Services } from '../../common/constants';
import { IConfig, ILogger } from '../../common/interfaces';
import { Payload } from '../../common/models/payload';

@injectable()
export class ValidationManager {
  public constructor(@inject(Services.CONFIG) private readonly config: IConfig, @inject(Services.LOGGER) private readonly logger: ILogger) {}

  public validateModelPath(payload: Payload): Payload {
    const basePath = this.config.get<string>('paths.basePath');
    const mountPath = this.config.get<string>('paths.mountPath');
    if (payload['modelPath'].includes(basePath)) {
      const newModelPath = payload['modelPath'].replace(basePath, mountPath);
      payload['modelPath'] = newModelPath;
      return payload;
    }
    throw new Error('Unknown model path- the model isnt in the agreed folder');
  }
}
