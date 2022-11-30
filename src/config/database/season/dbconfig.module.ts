import { Module,Global } from "@nestjs/common";
import { DBConfigService } from "./dbconfig.service";

@Global()
@Module({
  providers: [DBConfigService],
})
export class SeasonDBConfigModule {}
