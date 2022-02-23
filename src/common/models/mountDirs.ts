import config from 'config';

export const mountDirs = [
  {
    physical: config.get<string>('paths.pvPath'),
    displayName: config.get<string>('paths.basePath'),
  },
];
