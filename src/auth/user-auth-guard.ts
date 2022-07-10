import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import appConfig from '../config';
import { AppRequest } from '../models';
import { AuthService } from './auth.service';

/**
 * Responsible of guarding endpoints by authenticating them, including their roles using JWT.
 */
@Injectable()
export class UserAuthGuard extends AuthGuard('jwt') {
  constructor(private authService: AuthService, private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // First validate the user
    const isUserValidated = await this.validateAndAppendUserToRequest(context)

    // If the user is validated
    if (isUserValidated) {
      return true;
    }

    return false;
  }

  /**
   * Validates the request, add the user to the request, and return true or false if request is authorized.
   * @param context
   */
  async validateAndAppendUserToRequest(
    context: ExecutionContext,
  ): Promise<boolean> {
    // If we are on test environment, use 'simplified' authentication
    if (appConfig.ENVIRONMENT === 'test') {
      const testUserValidated = await this.validateAndAppendUserForTest(
        context,
      );

      if (testUserValidated) return true;
    }

    // Use normal JWT authentication
    return <Promise<boolean>>super.canActivate(context);
  }

  async validateAndAppendUserForTest(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request: AppRequest = context.switchToHttp().getRequest();
    const authorizationHeader: string = request.header('authorization');

    // If this authorization header is bearer
    if (
      authorizationHeader &&
      authorizationHeader.toLowerCase().startsWith('bearer')
    ) {
      // Get the token itself (removes the 'bearer')
      const token = this.extractTokenFromBearerHeader(authorizationHeader);

      // decode the token

      const user = await this.authService.getUserFromToken(token);

      // If the user is found, add it to the request

      if (user) {
        request.user = user;
        return true;
      }

      return false;

    }
  }



  /**
   * Extracts only the token portion from the bearer header.
   * @param bearerHeader
   */
  private extractTokenFromBearerHeader(bearerHeader: string): string {
    return /(?<=bearer ).+/gi.exec(bearerHeader)[0];
  }
}
