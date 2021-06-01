import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from '../auth/strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: 'test',
      signOptions: { expiresIn: '15m' },
      verifyOptions: {
        algorithms: ['ES256'],
      },
    }),
  ],
  providers: [ConfigService, AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
