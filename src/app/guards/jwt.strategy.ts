import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from 'jsonwebtoken';
import { jwtConstants } from 'src/helpers/constants';



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.JWTSECRET,
    })
    
  }

  async validate(payload: JwtPayload) {
    // Implement your logic for validating the JWT token and returning a user object
  }
}
