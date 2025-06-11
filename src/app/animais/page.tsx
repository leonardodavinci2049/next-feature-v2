import React, { Suspense } from "react";
import AnimaisList from "./components/animais-list";

/**
 * Página de listagem de animais
 * Mantida como Server Component para melhor performance
 */
const AnimaisPage = () => {
  return (
    <Suspense fallback={<div className="p-4">Carregando animais...</div>}>
      <AnimaisList />
    </Suspense>
  );
};

export default AnimaisPage;
