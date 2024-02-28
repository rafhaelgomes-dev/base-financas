import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";

@Module({
  imports: [JwtModule.register({
    secret: "iQmEu~?XnnM^N:8'2H*ka'343f(g5x69"
  })],
  exports: [],
  providers: [AuthService],
  controllers: []
})
export class AuthModule {}