import { ChildProcessWithoutNullStreams } from "child_process";
import { IStreamLogger } from "./stream-logger.interface";

export class StreamHandler {
  constructor(private logger: IStreamLogger) {}

  processOutput(stream: ChildProcessWithoutNullStreams) {
    const processData = (data: Buffer, streamType: string) => {
      const dataString = data.toString();
      if (streamType === "stdout") {
        this.logger.log(dataString);
      } else if (streamType === "stderr") {
        this.logger.error(dataString);
      }
    };

    stream.stdout.on("data", (data: Buffer) => {
      processData(data, "stdout");
    });

    stream.stderr.on("data", (data: Buffer) => {
      processData(data, "stderr");
    });

    stream.on("close", () => {
      this.logger.end();
    });
  }
}
