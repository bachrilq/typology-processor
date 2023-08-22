import apm, { TransactionOptions } from 'elastic-apm-node';
import { configuration } from './config';

/*
 * Initialize the APM Logging
 **/
let startTransaction = (name: string, options?: TransactionOptions): apm.Transaction | null => { return null };
let startSpan = (name: string): apm.Span | null => { return null }
let getCurrentTraceparent = (): string | null => { return null }

if (configuration.apm.active === 'true') {
  apm.start({
    serviceName: configuration.apm?.serviceName,
    secretToken: configuration.apm?.secretToken,
    serverUrl: configuration.apm?.url,
    usePathAsTransactionName: true,
    active: Boolean(configuration.apm?.active),
  });

  startTransaction = (name: string, options?: TransactionOptions): apm.Transaction | null => {
    return apm.startTransaction(name, options);
  }

  startSpan = (name: string): apm.Span | null => {
    return apm.startSpan(name);
  }

  getCurrentTraceparent = (): string | null => {
    return apm.currentTraceparent;
  }
}

export { startTransaction, startSpan, getCurrentTraceparent };