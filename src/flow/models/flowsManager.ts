import axios from 'axios';
import { inject, injectable } from 'tsyringe';
import { Logger } from '@map-colonies/js-logger';
import { SERVICES } from '../../common/constants';
import { IConfig } from '../../common/interfaces';
import { Flow } from '../../common/models/flow';
import { FlowPayload } from '../../common/models/flowPayload';

@injectable()
export class FlowsManager {
  public constructor(@inject(SERVICES.CONFIG) private readonly config: IConfig, @inject(SERVICES.LOGGER) private readonly logger: Logger) {}

  public async createFlow(payload: FlowPayload): Promise<Flow> {
    this.logger.debug({ msg: 'got a request for a new flow', flowPayload: payload });
    const url = this.config.get<string>('flowUrl');
    const response = await axios.post<Flow>(url, payload);
    this.logger.debug({ msg: 'sent to Nifi successfully' });
    return response.data;
  }
}
