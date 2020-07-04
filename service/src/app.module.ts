import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { WorkersModule } from "./workers/workers.module";
import { configValidation, configPattern } from "./config";
import { Worker } from "./entities/worker.entity";
import { Item } from "./entities/item.entity";
import { WorkerStats } from "./entities/workers-stats.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configPattern],
      validationSchema: configValidation,
      envFilePath: [".env"],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get<string>("db.host"),
        port: configService.get<number>("db.port"),
        username: configService.get<string>("db.username"),
        password: configService.get<string>("db.password"),
        database: configService.get<string>("db.database"),
        synchronize: true,
        entities: [Worker, Item, WorkerStats]
      }),
      inject: [ConfigService],
    }),
    WorkersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
