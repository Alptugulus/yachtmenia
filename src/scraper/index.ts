export { BrowserService } from './browser-service'
export type { BrowserConfig } from './browser-service'

export {
  navigateTo,
  waitForNetworkSettled,
  scrollPage,
  fullPageScroll,
  takeScreenshot,
  withScreenshotOnError,
  humanClick,
  humanType,
  jiggleMouse,
  waitForImages,
  collectImageUrls,
  safeTextContent,
  safeAttribute,
  createStealthPage,
  createFullPage,
} from './page-helpers'
export type { NavigationOptions, ScrollOptions, ScreenshotOptions } from './page-helpers'

export { withRetry, withTimeout, sleep, humanDelay, TimeoutError } from './retry'
export type { RetryOptions, TimeoutOptions } from './retry'

export { createLogger, setLogLevel, LogLevel } from './logger'
export type { Logger } from './logger'

export {
  Provider,
  detectProvider,
  tryDetectProvider,
  isSupportedUrl,
  isProvider,
  providerLabel,
  providerOrigin,
  UnsupportedProviderError,
  InvalidUrlError,
  SUPPORTED_PROVIDERS,
} from './providers'
export type { DetectionResult } from './providers'
