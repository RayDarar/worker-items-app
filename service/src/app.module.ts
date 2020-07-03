import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { WorkersModule } from "./workers/workers.module";
import { configValidation, configPattern } from "./config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configPattern],
      validationSchema: configValidation,
      envFilePath: [".env"],
    }),
    WorkersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
