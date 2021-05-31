import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/users/users.dto';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ username, password }: LoginUserDto): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && compareSync(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user) {
    console.log('III ' + user.userId);

    const payload = { username: user.username, sub: user.userId };

    const access_token = await this.jwtService.signAsync(payload);
    return {
      access_token,
    };
  }
}
