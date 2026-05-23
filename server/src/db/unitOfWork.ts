import { DBProvider } from './provider';

export interface UnitOfWork {
  run<T>(fn: () => Promise<T>): Promise<T>;
}

export function unitOfWork(dbProvider: DBProvider): UnitOfWork {
  return {
    run: (fn) => dbProvider.transaction(fn),
  };
}
