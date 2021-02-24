import { inject, injectable } from 'tsyringe';
import { Services } from '../../common/constants';
import { IConfig, ILogger } from '../../common/interfaces';
import { Flow } from '../../common/models/flow';
import post from '../../common/utils/post';

@injectable()
export class FlowsManager {
  public constructor(@inject(Services.CONFIG) private readonly config: IConfig, @inject(Services.LOGGER) private readonly logger: ILogger) {}

  public async createFlow(flow: Flow): Promise<Flow> {
    this.logger.log('info', `Create a new flow: ${JSON.stringify(flow)}`);
    const url = this.config.get<string>('flowUrl');
    const created = await post(url, flow);
    return created as Flow;
  }
}
