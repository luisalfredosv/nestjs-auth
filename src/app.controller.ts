import {
  Controller,
  Get,
  Post,
  UseGuards,
  Body,
  Req,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { CreateUserDto } from './users/users.dto';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    console.log('sss  ' + JSON.stringify(req, null, 2));

    return this.authService.login(req.user);
  }

  //@UseGuards(LocalAuthGuard)
  @Post('auth/registrer')
  async registrer(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    console.log(req.user);

    return req.user;
  }
}
