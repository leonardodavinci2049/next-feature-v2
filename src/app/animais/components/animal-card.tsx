"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { type Animal } from "@/services/api/animais";

interface AnimalCardProps {
  animal: Animal;
}

export const AnimalCard: React.FC<AnimalCardProps> = ({ animal }) => {
  // Converter URL relativa para URL completa se necessário
  const imageUrl = animal.imagem.startsWith("http")
    ? animal.imagem
    : `https://api.origamid.online${animal.imagem}`;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-square relative bg-gray-100">
        <Link href={`/animais/image/${animal.id}`}>
          <Image
            src={imageUrl}
            alt={animal.nome}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+on//Z"
          />
        </Link>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {animal.nome}
        </h3>

        <p className="text-gray-600 text-sm line-clamp-3">{animal.descricao}</p>

        <div className="mt-3">
          <Link
            href={`/animais/image/${animal.id}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
          >
            Ver imagem
            <svg
              className="ml-1 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};
