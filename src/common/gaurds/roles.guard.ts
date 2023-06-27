import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { LoggerService } from 'src/logging.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly loggerService: LoggerService,
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
      const decodedToken = this.jwtService.verify(token); // Decode the JWT token
      const userRoles = decodedToken ? decodedToken['role'] : 'unauthorized';

      return requiredRoles.some((role) => userRoles.includes(role));
    } catch (err) {
      const end = Date.now();
      const executionTime = end - start;
      this.loggerService.logError(request, executionTime, err);
      // this.loggerService.logError(request, 0, err);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
