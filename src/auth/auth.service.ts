import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/interface/user.interface';
import { JwtPayload } from './jwt-payload.interface';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async generateToken(user: User): Promise<string> {
    const payload: JwtPayload = { userId: user.id, role: user.role };
    return this.jwtService.signAsync(payload);
  }
}
