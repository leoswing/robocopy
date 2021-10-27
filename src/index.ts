import process from './process';
import command from './command';
import { RobocopyCommandArgs } from '../typings';

/**
 * Run in parallel
 *
 * @param {Record<string, any>} commands
 * @return {*}  {Promise<any>}
 */
function runParallel(commands: Record<string, any>): Promise<any> {
  return Promise.all(commands.map(command => process(command)));
}

const robocopy = (options: RobocopyCommandArgs) => runParallel(command(options));

export default robocopy;
export { robocopy };
