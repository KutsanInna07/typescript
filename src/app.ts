import { DirExecuter } from "./commands/dir/dir.executor";
import { ConsoleLogger } from "./out/console-logger/console-logger";

class App {
  async run() {
    const logger = ConsoleLogger.getInstance();
    const dirExecuter = new DirExecuter(logger);
    await dirExecuter.execute();
  }
}

const app = new App();
app.run();
