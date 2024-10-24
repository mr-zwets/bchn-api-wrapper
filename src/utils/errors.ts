export class RetryLimitExceededError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RetryLimitExceededError';
  }
}
