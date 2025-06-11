"use client";

import { useState, useEffect } from "react";

interface ImageDimensions {
  width: number | null;
  height: number | null;
  loading: boolean;
  error: string | null;
}

/**
 * Hook customizado para obter as dimensões de uma imagem
 * @param src - URL da imagem
 * @returns Objeto com largura, altura, estado de loading e erro
 */
export const useImageDimensions = (src: string): ImageDimensions => {
  const [dimensions, setDimensions] = useState<ImageDimensions>({
    width: null,
    height: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!src) {
      setDimensions((prev) => ({
        ...prev,
        loading: false,
        error: "URL da imagem não fornecida",
      }));
      return;
    }

    setDimensions((prev) => ({ ...prev, loading: true, error: null }));

    const img = new Image();

    img.onload = () => {
      setDimensions({
        width: img.naturalWidth,
        height: img.naturalHeight,
        loading: false,
        error: null,
      });
    };

    img.onerror = () => {
      setDimensions({
        width: null,
        height: null,
        loading: false,
        error: "Erro ao carregar a imagem",
      });
    };

    img.src = src;

    // Cleanup function
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return dimensions;
};
