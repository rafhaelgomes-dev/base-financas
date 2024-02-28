  import { Module } from '@nestjs/common';
  import { AppController } from './app.controller';
  import { AppService } from './app.service';
  import { TypeOrmModule } from '@nestjs/typeorm';
  import { UsersModule } from './app/users/users.module';
  @Module({
    imports: [TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.TYPEORM_HOST,
        port: Number(process.env.TYPEORM_PORT),
        username: process.env.TYPEORM_USERNAME,
        password: process.env.TYPEORM_PASSWORD,
        database: process.env.TYPEORM_DATABASE,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false,
      }),
      UsersModule
    ],
    controllers: [AppController],
    providers: [AppService],
  })
  export class AppModule {}
