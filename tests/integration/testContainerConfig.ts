import { container } from 'tsyringe';
import config from 'config';
import jsLogger from '@map-colonies/js-logger';
import { SERVICES } from '../../src/common/constants';

function registerTestValues(): void {
  container.register(SERVICES.CONFIG, { useValue: config });
  container.register(SERVICES.LOGGER, { useValue: jsLogger({ enabled: false }) });
}

export { registerTestValues };
