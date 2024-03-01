import { promises } from "fs";
import { dirname, isAbsolute, join, resolve } from "path"; // Імпортуємо isAbsolute

export class FileService {
  private async isExist(path: string) {
    try {
      await promises.stat(path);
      return true;
    } catch {
      return false;
    }
  }

  public getFilePath(path: string, name: string, ext: string): string {
    if (!isAbsolute(path)) {
      path = resolve(path);
    }
    return join(dirname(path), `${name}.${ext}`);
  }

  async deleteFileIfExists(path: string) {
    if (await this.isExist(path)) {
      await promises.unlink(path);
    }
  }
}
