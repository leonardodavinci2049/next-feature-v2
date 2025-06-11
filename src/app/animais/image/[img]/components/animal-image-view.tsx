"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { type Animal } from "@/services/api/animais";
import { useImageDimensions } from "@/hooks/use-image-dimensions";

interface AnimalImageViewProps {
  animal: Animal;
}

/**
 * Componente para exibir a imagem detalhada de um animal
 * Mostra informações como nome e dimensões dinâmicas da imagem
 */
const AnimalImageView: React.FC<AnimalImageViewProps> = ({ animal }) => {
  // Converter URL relativa para URL completa se necessário
  const imageUrl = animal.imagem.startsWith("http")
    ? animal.imagem
    : `https://api.origamid.online${animal.imagem}`;

  const { width, height, loading, error } = useImageDimensions(imageUrl);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header com navegação */}
      <div className="mb-8">
        <Link
          href="/animais"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors mb-4"
        >
          <svg
            className="mr-2 w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Voltar para animais
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-2">{animal.nome}</h1>

        <p className="text-gray-600 text-lg max-w-2xl">{animal.descricao}</p>
      </div>

      {/* Informações da imagem */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Informações da Imagem
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-blue-800 mb-1">Nome do Animal</h3>
            <p className="text-blue-600 text-lg font-semibold">{animal.nome}</p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-medium text-green-800 mb-1">Largura</h3>
            {loading ? (
              <div className="animate-pulse bg-green-200 h-6 w-16 rounded"></div>
            ) : error ? (
              <p className="text-red-500 text-sm">Erro ao carregar</p>
            ) : (
              <p className="text-green-600 text-lg font-semibold">{width}px</p>
            )}
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-medium text-purple-800 mb-1">Altura</h3>
            {loading ? (
              <div className="animate-pulse bg-purple-200 h-6 w-16 rounded"></div>
            ) : error ? (
              <p className="text-red-500 text-sm">Erro ao carregar</p>
            ) : (
              <p className="text-purple-600 text-lg font-semibold">
                {height}px
              </p>
            )}
          </div>
        </div>

        {!loading && !error && width && height && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-800 mb-2">Proporção</h3>
            <p className="text-gray-600">
              Aspecto: {(width / height).toFixed(2)}:1
              {width > height
                ? " (Paisagem)"
                : width < height
                ? " (Retrato)"
                : " (Quadrada)"}
            </p>
          </div>
        )}
      </div>

      {/* Imagem principal */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div
          className="relative w-full"
          style={{
            aspectRatio: "16/9",
            position: "relative",
          }}
        >
          <Image
            src={imageUrl}
            alt={`Imagem detalhada de ${animal.nome}`}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            priority
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+on//Z"
            onError={(e) => {
              console.error("Erro ao carregar imagem:", e);
            }}
          />
        </div>

        <div className="p-6">
          <div className="text-center space-y-2">
            <p className="text-gray-600">
              Clique com o botão direito na imagem para salvar ou abrir em uma
              nova aba
            </p>
            <div className="text-sm text-gray-500">
              URL da imagem:{" "}
              <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                {imageUrl}
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalImageView;
