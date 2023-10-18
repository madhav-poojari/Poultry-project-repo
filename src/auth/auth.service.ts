import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/interface/user.interface';
import { JwtPayload } from './jwt-payload.interface';


@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async generateToken(user: User): Promise<string> {
    const payload: JwtPayload = { userId: user.id};
    return this.jwtService.signAsync(payload);
  }
}
