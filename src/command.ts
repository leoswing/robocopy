import * as path from 'path';
import { RobocopyCommandArgs } from '../typings';

/**
 * Return auote string or string[]
 *
 * @param {(string | string[])} pathParam
 * @return {*}  {(string | string[])}
 */
function qualify(pathParam: string | string[]): string | string[] {
  const quote = p => `"${p}"`;

  if (pathParam instanceof Array) {
    return pathParam.map(quote);
  }

  return quote(pathParam);
}

/**
 * Convert to windows path
 *
 * @param {(string | string[])} pathParam
 * @return {*}  {(string | string[])}
 */
function toWindowsPath(pathParam: string | string[]): string | string[] {
  const clean = (p: string) => {
    let strPath = p.replace(/\//g, '\\').trim();

    if (strPath.substr(-1) === '\\') {
      strPath = strPath.substr(0, p.length - 1);
    }

    return strPath;
  };

  if (pathParam instanceof Array) {
    return pathParam.map(clean);
  }

  return clean(pathParam);
}

/**
 * Convert to absolute path
 *
 * @param {(string | string[])} relativePath
 * @param {*} [base]
 * @return {*}  {(string | string[])}
 */
function toAbsolutePath(
  relativePath: string | string[],
  base?: any,
): string | string[] {
  const toAbsolute = (p: string) => {
    if (p.startsWith('\\\\') || p.includes(':')) {
      return p;
    }

    return base ? path.join(base, p) : path.resolve(p);
  };

  if (relativePath instanceof Array) {
    return relativePath.map(toAbsolute);
  }

  return toAbsolute(relativePath);
}

/**
 * Construct with command arguments
 *
 * @param {Record<string, any>} options
 * @return {*}
 */
function constructCommandArgs(options: Partial<RobocopyCommandArgs>) {
  let args = [];

  const source = toAbsolutePath(options.source);
  const destination = toAbsolutePath(options.destination);

  args.push(qualify(toWindowsPath(source)));
  args.push(qualify(toWindowsPath(destination)));

  if (options.files) {
    args = args.concat(qualify(toWindowsPath(options.files)));
  }

  if (options.copy) {
    const { copy } = options;
    const {
      subdirs,
      emptySubdirs,
      levels,
      restartMode,
      backupMode,
      restartThenBackupMode,
      efsRawMode,
      info,
      dirTimestamps,
      securityInfo,
      allInfo,
      noInfo,
      fixSecurity,
      fixTimes,
      purge,
      mirror,
      moveFiles,
      moveFilesAndDirs,
      addAttributes,
      removeAttributes,
      createDirsAndEmptyFiles,
      fatFilenames,
      disableLongPaths,
      monitorCountTrigger,
      monitorTimeTrigger,
      multiThreaded,
      runTimes,
      interPacketGap,
      symbolicLink,
    } = copy;

    subdirs && args.push('/s');
    emptySubdirs && args.push('/e');
    levels && args.push(`/lev:${levels}`);
    restartMode && args.push('/z');
    backupMode && args.push('/b');
    restartThenBackupMode && args.push('/zb');
    efsRawMode && args.push('/efsraw');
    info && args.push(`/copy:${info}`);
    dirTimestamps && args.push('/dcopy:T');
    securityInfo && args.push('/sec');

    allInfo && args.push('/copyall');
    noInfo && args.push('/nocopy');
    fixSecurity && args.push('/secfix');
    fixTimes && args.push('/timfix');
    purge && args.push('/purge');
    mirror && args.push('/mir');
    moveFiles && args.push('/mov');
    moveFilesAndDirs && args.push('/move');
    addAttributes && args.push(`/a+:${addAttributes}`);

    removeAttributes && args.push(`/a-:${removeAttributes}`);
    createDirsAndEmptyFiles && args.push('/create');
    fatFilenames && args.push('/fat');
    disableLongPaths && args.push('/256');
    monitorCountTrigger && args.push(`/mon:${monitorCountTrigger}`);
    monitorTimeTrigger && args.push(`/mot:${monitorTimeTrigger}`);

    if (multiThreaded) {
      args.push(`/MT${
        multiThreaded !== true && multiThreaded > 0
          ? `:${multiThreaded}`
          : ''
      }`);
    }

    if (runTimes) {
      args.push(`/rh:${runTimes.start.replace(
        // eslint-disable-next-line no-useless-escape
        /\:/g,
        '',
      // eslint-disable-next-line no-useless-escape
      )}-${runTimes.end.replace(/\:/g, '')}`);

      if (runTimes.checkPerFile) {
        args.push('/pf');
      }
    }

    interPacketGap && args.push(`/ipg:${interPacketGap}`);
    symbolicLink && args.push('/sl');
  }

  if (options.file) {
    const { file } = options;
    const {
      copyArchived,
      copyArchivedAndReset,
      includeAttributes,
      excludeAttributes,
      excludeFiles,
      excludeChangedFiles,
      excludeNewerFiles,
      excludeOlderFiles,
      excludeExtraFilesAndDirs,
      excludeLonelyFilesAndDirs,
      includeSameFiles,
      includeTweakedFiles,
      maximumSize,
      minimumSize,
      maximumAge,
      minimumAge,
      maximumLastAccess,
      minimumLastAccess,
      fatFileTimes,
      compensateForDst,
      excludeJunctions,
      excludeDirectoryJunctions,
      excludeFileJunctions,
    } = file;

    copyArchived && args.push('/a');
    copyArchivedAndReset &&  args.push('/m');
    includeAttributes && args.push(`/ia:${includeAttributes}`);
    excludeAttributes && args.push(`/xa:${excludeAttributes}`);

    if (excludeFiles && excludeFiles.length > 0) {
      args.push('/xf');
      args = args.concat(qualify(toWindowsPath(excludeFiles)));
    }

    if (file?.excludeDirs?.length > 0) {
      args.push('/xd');
      let excludeDirs;

      if (file.excludeDirsRelative) {
        excludeDirs = qualify(toWindowsPath(file.excludeDirs));
      } else {
        const sourceDirsExclude = toAbsolutePath(file.excludeDirs, source);
        const destDirsExclude = toAbsolutePath(file.excludeDirs, destination);

        excludeDirs = Array.from(new Set([...sourceDirsExclude, ...destDirsExclude]))
          .map(toWindowsPath)
          .map(qualify);
      }
      args = args.concat(excludeDirs);
    }

    excludeChangedFiles && args.push('/xct');
    excludeNewerFiles && args.push('/xn');
    excludeOlderFiles && args.push('/xo');
    excludeExtraFilesAndDirs && args.push('/xx');
    excludeLonelyFilesAndDirs && args.push('/xl');
    includeSameFiles && args.push('/is');
    includeTweakedFiles && args.push('/it');
    maximumSize && args.push(`/max:${maximumSize}`);
    minimumSize && args.push(`/min:${minimumSize}`);
    maximumAge && args.push(`/maxage:${maximumAge}`);
    minimumAge && args.push(`/minage:${minimumAge}`);
    maximumLastAccess && args.push(`/maxlad:${maximumLastAccess}`);
    minimumLastAccess && args.push(`/minlad:${minimumLastAccess}`);
    fatFileTimes && args.push('/fft');
    compensateForDst && args.push('/dst');
    excludeJunctions && args.push('/xj');
    excludeDirectoryJunctions && args.push('/xjd');
    excludeFileJunctions && args.push('/xjf');
  }

  if (options.retry) {
    const { retry } = options;
    const { count, wait, saveAsDefault, waitForShareNames } = retry;

    count && args.push(`/r:${count}`);
    wait && args.push(`/w:${wait}`);
    saveAsDefault && args.push('/reg');
    waitForShareNames && args.push('/tbd');
  }

  if (options.logging) {
    const { logging } = options;

    const {
      listOnly,
      includeExtraFiles,
      verbose,
      includeSourceTimestamps,
      includeFullPaths,
      sizesAsBytes,
      excludeFileSizes,
      excludeFileClasses,
      excludeFilenames,
      excludeDirectoryNames,
      hideProgress,
      showEta,
      output,
      showUnicode,
      showAndLog,
      noJobHeader,
      noJobSummary,
    } = logging;

    listOnly && args.push('/l');
    includeExtraFiles && args.push('/x');
    verbose && args.push('/v');
    includeSourceTimestamps && args.push('/ts');
    includeFullPaths && args.push('/fp');
    sizesAsBytes && args.push('/bytes');
    excludeFileSizes && args.push('/ns');
    excludeFileClasses && args.push('/nc');
    excludeFilenames && args.push('/nfl');
    excludeDirectoryNames && args.push('/ndl');
    hideProgress && args.push('/np');
    showEta && args.push('/eta');

    if (output) {
      args.push(`/${output.unicode ? 'uni' : ''}log${
        output.overwrite ? '' : '+'
      }:${qualify(toWindowsPath(output.file))}`);
    }

    showUnicode && args.push('/unicode');
    showAndLog && args.push('/tee');
    noJobHeader && args.push('/njh');
    noJobSummary && args.push('/njs');
  }

  if (options.job) {
    const { job } = options;
    const {
      deriveParameters,
      saveParameters,
      quiteAfterProcessing,
      noSourceDir,
      noDestinationDir,
      includesFiles,
    } = job;

    deriveParameters && args.push(`/job:${qualify(deriveParameters)}`);
    saveParameters && args.push(`/save:${qualify(saveParameters)}`);
    quiteAfterProcessing && args.push('/quit');
    noSourceDir && args.push('/nosd');
    noDestinationDir && args.push('/nodd');
    includesFiles && args.push('/if');
  }

  return {
    path: 'robocopy',
    args,
  };
}

const commandExecutor = (options: RobocopyCommandArgs) => {
  const target: Array<string> = Array.isArray(options.destination)
    ? options.destination
    : [options.destination];

  return target.map(destination => constructCommandArgs(Object.assign(options, { destination })));
};

export default commandExecutor;
export { commandExecutor };
