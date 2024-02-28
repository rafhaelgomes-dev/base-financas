import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  // public createToken() {
  //   return this.jwtService.sign();
  // }

  // public VerifyToken(token: string) {
  //   // return this.jwtService.verify(token);
  // }
}