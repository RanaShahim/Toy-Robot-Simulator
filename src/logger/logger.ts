//Basic logger class to log info, warning, success and error messages
export class Logger {
  static logInfo(message: string): void {
    console.log(`[INFO] 💁‍♂️ ${message}`);
  }

  static logWarning(message: string): void {
    console.warn(`[WARNING] ⚠️ ${message}`);
  }

  static logCommandSuccess(message?: string): void {
    console.log(`[OPERATION SUCCESSFULL] ✅ ${message}`);
  }

  static logCommandError(message?: string): void {
    console.error(`[OPERATION FAILED] ❌ ${message}`);
  }
}
