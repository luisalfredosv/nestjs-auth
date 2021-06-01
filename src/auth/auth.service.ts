import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/users/users.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ username, password }: LoginUserDto) {
    const user = await this.usersService.findOne(username);

    if (user && user.comparePassword(password)) {
      // const { password, ...result } = user;
      return user;
    }
    return null;
  }

  async login(user) {
    const payload = { username: user.username, sub: user._id, admin: user.isAdmin };

    const access_token = await this.jwtService.signAsync(payload);
    return {
      access_token,
      payload
    };
  }
}
