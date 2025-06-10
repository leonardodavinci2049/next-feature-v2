"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const API_URL = process.env.API_URL;

export interface FormState {
  success: boolean;
  message: string;
  errors?: {
    nome?: string;
    preco?: string;
    descricao?: string;
    estoque?: string;
    importado?: string;
  };
}

export async function ActionAddProduct(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const product = {
      nome: formData.get("nome"),
      descricao: formData.get("descricao"),
      preco: parseFloat(formData.get("preco") as string),
      estoque: parseInt(formData.get("estoque") as string) || 0,
      importado: parseInt(formData.get("importado") as string) || 0,
    };

    // Validações básicas
    if (
      !product.nome ||
      typeof product.nome !== "string" ||
      product.nome.trim().length === 0
    ) {
      return {
        success: false,
        message: "Nome é obrigatório",
        errors: { nome: "Nome é obrigatório" },
      };
    }

    if (
      !product.descricao ||
      typeof product.descricao !== "string" ||
      product.descricao.trim().length === 0
    ) {
      return {
        success: false,
        message: "Descrição é obrigatória",
        errors: { descricao: "Descrição é obrigatória" },
      };
    }

    if (isNaN(product.preco) || product.preco <= 0) {
      return {
        success: false,
        message: "Preço deve ser um valor válido e maior que zero",
        errors: { preco: "Preço deve ser um valor válido e maior que zero" },
      };
    }

    const response = await fetch(`${API_URL}/produtos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error("Failed to add product");
    }

    revalidatePath("/product");
    redirect("/product");
  } catch (error) {
    console.error("Error adding product:", error);
    return {
      success: false,
      message: "Erro ao adicionar produto. Tente novamente.",
    };
  }
}
