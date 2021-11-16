import defaultTaskRunner from '@nrwl/workspace/tasks-runners/default';
import { Task, logger } from '@nrwl/devkit';

export function remoteCacheRunner(tasks: Task[], options, context?) {

  const adapterAsync = import(options.adapter);

  return defaultTaskRunner(
    tasks,
    { ...options, remoteCache: { retrieve, store } },
    context
  );



  async function retrieve(
    hash: string,
    cacheDirectory: string
  ): Promise<boolean> {
    const { cacheAdapter } = await adapterAsync;
    try {
      cacheAdapter.retrieve();
      logger.info(`NX Downloaded nx cache! ${hash} ${cacheDirectory}`);
      logger.info(`NX options ${JSON.stringify(options)}`);
      return true;
    } catch (error) {
      logger.error(`Error occurred whilst downloading nx cache! : ${error.message}`);
      return false;
    }
  }

  async function store(
    hash: string,
    cacheDirectory: string
  ): Promise<boolean> {
    try {
      logger.info(`Uploaded nx cache! ${hash} ${cacheDirectory}`);
      return true;
    } catch (error) {
      // output.error({
      //   title: `Error occurred whilst uploading nx cache! : ${error.message}`
      // });
      return false;
    }
  }
}
