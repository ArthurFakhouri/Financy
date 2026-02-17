import { prismaClient } from "../../prisma/prisma";
import type { LoginInput, RegisterInput } from "../DTOs/input/auth.input";
import type { User } from "../generated/prisma/client";
import { comparePassword, hashPassword } from "./utils/hash";
import { signJwt } from "./utils/jwt";

export class AuthService {
  async login(data: LoginInput) {
    const user = await prismaClient.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (!user) throw new Error("Usuário não encontrado!");

    const isPasswordValid = await comparePassword(data.password, user.password);
    if (!isPasswordValid) throw new Error("Senha incorreta!");

    return this.generateTokens(user);
  }

  async register(data: RegisterInput) {
    const existingUser = await prismaClient.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (existingUser) throw new Error("E-mail já cadastrado!");

    const hash = await hashPassword(data.password);

    const user = await prismaClient.user.create({
      data: {
        full_name: data.full_name,
        email: data.email,
        password: hash,
      },
    });

    return this.generateTokens(user);
  }

  generateTokens(user: User) {
    const token = signJwt(
      {
        id: user.id,
        email: user.email,
      },
      "15m",
    );
    const refreshToken = signJwt(
      {
        id: user.id,
        email: user.email,
      },
      "1d",
    );

    return { token, refreshToken, user };
  }
}
