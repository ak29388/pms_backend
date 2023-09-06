import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import entities from './typeOrm';
import { AdminModule } from './app/admin/admin.module';
import { AccountModule } from './app/account/account.module';
import { EmployeeModule } from './app/employee/employee.module';
import { EmployeeController } from './app/employee/employee.controller';
// import { AuthModule } from './app/auth/auth.module';
import { AuthModule } from './app/auth/auth.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './helpers/constants';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { JwtAuthGuard } from './app/guards/jwt-auth-user.guard';
import { UserMiddleware } from './middleware/userMiddleware';
// import { MailerModule } from '@nestjs-modules/mailer';
@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.JWTSECRET,
      signOptions: { expiresIn: '1min' },
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    // MailerModule.forRoot({
    //   transport: {
    //     service: 'Mailinator',
    //   },
    // }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: entities,
        synchronize: true,
        logging: false,
        // ssl: { rejectUnauthorized: false },
      }),
      inject: [ConfigService],
    }),
    AdminModule,
    AccountModule,
    EmployeeModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule  implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddleware)
      .forRoutes('*');
  }
}
