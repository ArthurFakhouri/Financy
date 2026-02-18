import { prismaClient } from "../../prisma/prisma";
import type { CreateTransactionInput, UpdateTransactionInput } from "../DTOs/input/transaction.input";

export class TransactionService {
  async createTransaction(data: CreateTransactionInput, userId: string) {
    const user = await prismaClient.transaction.create({
      data: {
        type: data.type,
        description: data.description,
        date: data.date,
        value: data.value,
        category_id: data.category_id,
        user_id: userId,
      }
    });

    return user;
  }

  async updateTransaction(data: UpdateTransactionInput, id: string) {
    const transaction = await prismaClient.transaction.findUnique({
      where: {
        id: id,
      },
    });

    if (!transaction) throw new Error("Transação não encontrada!");

    return await prismaClient.transaction.update({
      where: {
        id: transaction.id,
      },
      data: {
        type: data.type,
        description: data.description,
        date: data.date,
        value: data.value,
        category_id: data.category_id,
      },
    });
  }

  async deleteTransaction(id: string) {
    const existTransaction = await prismaClient.transaction.findUnique({
      where: {
        id,
      },
    });

    if (!existTransaction) throw new Error("Transação não encontrada!");

    return await prismaClient.transaction.delete({
      where: {
        id,
      },
    });
  }

  async listTransaction() {
    return await prismaClient.transaction.findMany();
  }

  async findByCategoryId(categoryId: string) {
    return await prismaClient.transaction.findMany({
      where: {
        category_id: categoryId,
      }
    })
  }
}
