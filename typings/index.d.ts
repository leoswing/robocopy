export interface RobocopyCommandArgs {
  source: string;
  destination: string | string[];
  files?: string[];
  copy?: {
    // Copies subdirectories. Note that this option excludes empty directories. [/s]
    subdirs?: boolean;

    // Copies subdirectories. Note that this option includes empty directories. [/e]
    emptySubdirs?: boolean;

    // Copies only the top N levels of the source directory tree. [/lev:<N>]
    levels?: number,

    // Copies files in Restart mode. [/z]
    restartMode?: boolean;

    // Copies files in Backup mode. [/b]
    backupMode?: boolean;

    // Uses Restart mode. If access is denied, this option uses Backup mode. [/zb]
    restartThenBackupMode?: boolean;

    // Copies all encrypted files in EFS RAW mode. [/efsraw]
    efsRawMode?: boolean;

    info?: string,

    // Copies directory time stamps. [/dcopy:T]
    dirTimestamps?: boolean;

    // Copies files with security (equivalent to copy.flags: 'DAT'). [/sec]
    securityInfo?: boolean;

    // Copies all file information (equivalent to copy.flags: 'DATSOU'). [/copyall]
    allInfo?: boolean;

    // Copies no file information (useful with copy.purge). [/nocopy]
    noInfo?: boolean;

    // Fixes file security on all files, even skipped ones. [/secfix]
    // When using this option, specify the type of security information
    // you want to copy by also using one of these additional copy options:
    // copy.allInfo, copy.info: 'O|S|U' or copy.securityInfo.
    fixSecurity?: boolean;

    // Fixes file times on all files, even skipped ones. [/timfix]
    fixTimes?: boolean;

    // Deletes destination files and directories that no longer exist in the source. [/purge]
    purge?: boolean;

    // Mirrors a directory tree (equivalent to copy.emptySubdirs plus copy.purge). [/mir]
    mirror?: boolean;

    // Moves files, and deletes them from the source after they are copied. [/mov]
    moveFiles?: boolean;

    // Moves files and directories, and deletes them from the source after they
    // are copied. [/move]
    moveFilesAndDirs?: boolean;

    // Adds the specified attributes to copied files. [/a+:[RASHCNET]]
    addAttributes?: string,

    // Removes the specified attributes from copied files. [/a-:[RASHCNET]]
    removeAttributes?: string,

    // Creates a directory tree and zero-length files only. [/create]
    createDirsAndEmptyFiles?: boolean;

    // Creates destination files by using 8.3 character-length FAT file names only. [/fat]
    fatFilenames?: boolean;

    // Turns off support for very long paths (longer than 256 characters). [/256]
    disableLongPaths?: boolean;

    // Monitors the source, and runs again when more than N changes are detected. [/mon:<N>]
    monitorCountTrigger?: number;

    // Monitors source, and runs again in M minutes if changes are detected. [/mot:<M>]
    monitorTimeTrigger?: number;

    // Creates multi-threaded copies with N threads. N must be an integer between
    // 1 and 128 or a boolean. [/MT[:N]]
    // - The default value for N is 8.
    // - This parameter cannot be used with the copy.interPacketGap and
    //   copy.efsRawMode parameters.
    // - Redirect output using log.enabled option for better performance.
    // - This flag applies to Windows Server 2008 R2 and Windows 7.
    multiThreaded?: boolean | number;

    // Specifies run times when new copies may be started. [/rh:hhmm-hhmm]
    runTimes?: {
      start: string,
      end: string,
      // Checks run times on a per-file (not per-pass) basis. [/pf]
      checkPerFile?: boolean
    },

    // Specifies the inter-packet gap to free bandwidth on slow lines. [/ipg:n]
    interPacketGap?: number;

    // Copies the symbolic link instead of the target. [/sl]
    symbolicLink?: boolean;
  },
  file?: {
    // Copies only files for which the Archive attribute is set. [/a]
    copyArchived?: boolean;

    // Copies only files for which the Archive attribute is set, and resets the
    // Archive attribute. [/m]
    copyArchivedAndReset?: boolean;

    // Includes only files for which any of the specified attributes are set.
    // [/ia:[RASHCNETO]]
    includeAttributes?: string;

    // Excludes files for which any of the specified attributes are set. [/xa:[RASHCNETO]]
    excludeAttributes?: string;

    // Excludes files that match the specified names or paths. Note that FileName
    // can include wildcard characters (* and ?). [/xf <FileName>[ ...]]
    excludeFiles?: string[];

    // Excludes directories that match the specified names and paths.
    // [/xd <Directory>[ ...]]
    excludeDirs?: string[];

    // Leaves excluded directories as relative paths.
    // Converts to absolute paths by default.
    excludeDirsRelative?: boolean;

    // Excludes changed files. [/xct]
    excludeChangedFiles?: boolean;

    // Excludes newer files. [/xn]
    excludeNewerFiles?: boolean;

    // Excludes older files. [/xo]
    excludeOlderFiles?: boolean;

    // Excludes extra files and directories. [/xx]
    excludeExtraFilesAndDirs?: boolean;

    // Excludes "lonely" files and directories. [/xl]
    excludeLonelyFilesAndDirs?: boolean;

    // Includes the same files. [/is]
    includeSameFiles?: boolean;

    // Includes "tweaked" files. [/it]
    includeTweakedFiles?: boolean;

    // Specifies the maximum file size (to exclude files bigger than N bytes). [/max:<N>]
    maximumSize?: number;

    // Specifies the minimum file size (to exclude files smaller than N bytes). [/min:<N>]
    minimumSize?: number;

    // The following four options can either be an integer or date. If N is less than 1900,
    // N specifies the number of days. Otherwise, N specifies a date in the format YYYYMMDD.

    // Specifies the maximum file age (exclude files older than N days or date) [/maxage:<N>]
    maximumAge?: number | string;

    // Specifies the minimum file age (exclude files newer than N days or date) [/minage:<N>]
    minimumAge?: number | string;

    // Specifies the maximum last access date (excludes files unused since N) [/maxlad:<N>]
    maximumLastAccess?: number | string;

    // Specifies the minimum last access date (excludes files used since N) [/minlad:<N>]
    minimumLastAccess?: number | string;

    // Assumes FAT file times (two-second precision). [/fft]
    fatFileTimes?: boolean;

    // Compensates for one-hour DST time differences. [/dst]
    compensateForDst?: boolean;

    // Excludes junction points, which are normally included by default. [/xj]
    excludeJunctions?: boolean;

    // Excludes junction points for directories. [/xjd]
    excludeDirectoryJunctions?: boolean;

    // Excludes junction points for files. [/xjf]
    excludeFileJunctions?: boolean;
  },
  retry?: {
    // Specifies the number of retries on failed copies. The default value of N is
    // 1,000,000 (one million retries). [/r:<N>]
    count?: number;

    // Specifies the wait time between retries, in seconds. The default value of N
    // is 30 (wait time 30 seconds). [/w:<N>]
    wait?: number;

    // Saves the values specified in the retry.count and retry.wait options as
    // default settings in the registry. [/reg]
    saveAsDefault?: boolean;

    // Specifies that the system will wait for share names to be defined
    // (retry error 67). [/tbd]
    waitForShareNames?: boolean;
  },
  logging?: {
    // Specifies that files are to be listed only (and not copied, deleted, or
    // time stamped). [/l]
    listOnly?: boolean;

    // Reports all extra files, not just those that are selected. [/x]
    includeExtraFiles?: boolean;

    // Produces verbose output, and shows all skipped files. [/v]
    verbose?: boolean;

    // Includes source file time stamps in the output. [/ts]
    includeSourceTimestamps?: boolean;

    // Includes the full path names of the files in the output. [/fp]
    includeFullPaths?: boolean;

    // Prints sizes, as bytes. [/bytes]
    sizesAsBytes?: boolean;

    // Specifies that file sizes are not to be logged. [/ns]
    excludeFileSizes?: boolean;

    // Specifies that file classes are not to be logged. [/nc]
    excludeFileClasses?: boolean;

    // Specifies that file names are not to be logged. [/nfl]
    excludeFilenames?: boolean;

    // Specifies that directory names are not to be logged. [/ndl]
    excludeDirectoryNames?: boolean;

    // Specifies that the progress of the copying operation (the number of
    // files or directories copied so far) will not be displayed. [/np]
    hideProgress?: boolean;

    // Shows the estimated time of arrival (ETA) of the copied files. [/eta]
    showEta?: boolean;

    // Writes the status output to the log file.
    // [/log+:<LogFile>, /log:<LogFile>, /unilog:<LogFile>, /unilog+:<LogFile>]
    output?: {
      file: 'copy.log',
      overwrite?: boolean;
      unicode?: boolean;
    },

    // Displays the status output as Unicode text. [/unicode]
    showUnicode?: boolean;

    // Writes the status output to the console window, as well as to the log file. [/tee]
    showAndLog?: boolean;

    // Specifies that there is no job header. [/njh]
    noJobHeader?: boolean;

    // Specifies that there is no job summary. [/njs]
    noJobSummary?: boolean;
  },
  // Job options
  job?: {

    // Specifies that parameters are to be derived from the named job file. [/job:<JobName>]
    deriveParameters?: string;

    // Specifies that parameters are to be saved to the named job file. [/save:<JobName>]
    saveParameters?: string;

    // Quits after processing command line (to view parameters). [/quit]
    quiteAfterProcessing?: boolean;

    // Indicates that no source directory is specified. [/nosd]
    noSourceDir?: boolean;

    // Indicates that no destination directory is specified. [/nodd]
    noDestinationDir?: boolean;

    // Includes the specified files. [/if]
    includesFiles?: boolean;
  }
}

export function robocopy(options: RobocopyCommandArgs): Promise<any>;
export default function (options: RobocopyCommandArgs): Promise<any>;
