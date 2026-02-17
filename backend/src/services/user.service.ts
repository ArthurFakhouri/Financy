import { prismaClient } from "../../prisma/prisma";
import type { CreateUserInput } from "../DTOs/input/user.input";

export class UserService {
  async createUser(data: CreateUserInput) {
    const existingUser = await prismaClient.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (existingUser) throw new Error("E-mail já cadastrado!");

    const user = await prismaClient.user.create({
      data: {
        full_name: data.full_name,
        email: data.email,
        password: data.password
      },
    });

    return user;
  }

  async findUser(id: string) {
    const user = await prismaClient.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) throw new Error("Usuário não existe");

    return user;
  }
}
