import * as bcrypt from 'bcryptjs';
import { DocumentQuery } from 'mongoose';
import { UserProfile } from 'shared';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { IUserProfileDbModel, UserProfileDbModel } from '../database/models/user-profile.db.model';

/**
 * Responsible of authenticating users, it uses JWT for the authentication process.
 */
@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) { }

  /**
   * Checks if the provided username and password valid, if so, returns the user match. If not, returns null.
   * @param email
   * @param password
   */
  authenticate(email: string, password: string): Promise<IUserProfileDbModel> {
    return UserProfileDbModel.findOne({ email }).then(user => {
      // If this user does not exist, throw the same error for security reasons
      if (!user)
        throw new UnauthorizedException('Email or password are invalid!');

      return bcrypt.compare(password, user.password).then(match => {
        // The password do not match the one saved on the database
        if (!match)
          throw new UnauthorizedException('Email or password are invalid!');
        return user;
      });
    });
  }

  async getUserFromDB(
    email: string,
  ): Promise<IUserProfileDbModel> {
    return UserProfileDbModel.findOne({ email });
  }

  async getUserFromToken(
    token: string,
  ): Promise<UserProfile> {
    // Decode the token
    const decodedUser = this.jwtService.verify(token);

    if (decodedUser) {
      // If the user has been decoded successfully, check it against the database
      return UserProfileDbModel.findById(decodedUser._id);
    }
  }



  /**
   * Generates a JWT token with the specified user data.
   * @param user
   */
  generateToken(user: UserProfile): string {
    return this.jwtService.sign(user);
  }

  /**
   * Decodes a JWT token and returns the user found.
   * @param token
   */
  decodeToken(token: string): UserProfile {
    return this.jwtService.verify(token);
  }
}
