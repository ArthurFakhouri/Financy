import { prismaClient } from "../../prisma/prisma";
import type {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "../DTOs/input/category.input";

export class CategoryService {
  async createCategory(data: CreateCategoryInput, userId: string) {
    const user = await prismaClient.category.create({
      data: {
        title: data.title,
        description: data.description,
        icon: data.icon,
        color: data.color,
        user_id: userId,
      },
    });

    return user;
  }

  async updateCategory(data: UpdateCategoryInput, id: string) {
    const category = await prismaClient.category.findUnique({
      where: {
        id: id,
      },
    });

    if (!category) throw new Error("Categoria não encontrada!");

    return await prismaClient.category.update({
      where: {
        id: category.id,
      },
      data: {
        title: data.title,
        description: data.description,
        icon: data.icon,
        color: data.color,
      },
    });
  }

  async deleteCategory(id: string) {
    const existCategory = await prismaClient.category.findUnique({
      where: {
        id,
      },
    });

    if (!existCategory) throw new Error("Categoria não encontrada!");

    return await prismaClient.category.delete({
      where: {
        id,
      },
    });
  }

  async listCategory() {
    return await prismaClient.category.findMany();
  }

  async findCategory(id: string) {
    const category = await prismaClient.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) throw new Error("Categoria não existe");

    return category;
  }
}
