import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,

  ) {}

  canActivate(context: ExecutionContext): boolean {
    const start = Date.now();
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    if (!requiredRoles) {
      return true; // No roles required, access granted
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    try {
      const decodedToken = this.jwtService.verify(token);
      request.decodedToken = decodedToken; // Decode the JWT token
      console.log(decodedToken);

   return true;
    } catch (err) {
 
      throw new UnauthorizedException('Invalid token');
    }
  }
}
