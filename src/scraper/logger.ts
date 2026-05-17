// ---------------------------------------------------------------------------
//  Structured logger for the scraper engine.
//  Keeps console output scannable during long scrape runs.
// ---------------------------------------------------------------------------

export enum LogLevel {
  Debug = 0,
  Info = 1,
  Warn = 2,
  Error = 3,
  Silent = 4,
}

let currentLevel = LogLevel.Info

export function setLogLevel(level: LogLevel) {
  currentLevel = level
}

function ts(): string {
  return new Date().toISOString().slice(11, 23)
}

function fmt(level: string, tag: string, msg: string, meta?: Record<string, unknown>): string {
  const base = `[${ts()}] ${level.padEnd(5)} [${tag}] ${msg}`
  if (meta && Object.keys(meta).length > 0) {
    return `${base}  ${JSON.stringify(meta)}`
  }
  return base
}

export function createLogger(tag: string) {
  return {
    debug(msg: string, meta?: Record<string, unknown>) {
      if (currentLevel <= LogLevel.Debug) console.debug(fmt('DEBUG', tag, msg, meta))
    },
    info(msg: string, meta?: Record<string, unknown>) {
      if (currentLevel <= LogLevel.Info) console.info(fmt('INFO', tag, msg, meta))
    },
    warn(msg: string, meta?: Record<string, unknown>) {
      if (currentLevel <= LogLevel.Warn) console.warn(fmt('WARN', tag, msg, meta))
    },
    error(msg: string, meta?: Record<string, unknown>) {
      if (currentLevel <= LogLevel.Error) console.error(fmt('ERROR', tag, msg, meta))
    },
  }
}

export type Logger = ReturnType<typeof createLogger>
