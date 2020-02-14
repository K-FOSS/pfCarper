// src/Library/log.ts

type LogType = 'info' | 'log';

export function log(message: string, logType = 'log' as LogType): void {
  if (process.env.NODE_ENV === 'production' && logType === 'info') return;

  console[logType](message);
}
