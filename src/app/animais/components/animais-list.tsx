import { getAnimais, type Animal } from "@/services/api/animais";
import { AnimalCard } from "@/app/animais/components/animal-card";

const AnimaisList = async () => {
  let animais: Animal[] = [];
  let error: string | null = null;

  try {
    animais = await getAnimais();
  } catch (err) {
    error = "Erro ao carregar animais. Tente novamente mais tarde.";
    console.error("Erro ao buscar animais:", err);
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Animais</h1>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Nossos Animais
        </h1>
        <p className="text-gray-600 text-lg">
          Conheça os diversos animais que fazem parte do nosso zoológico
        </p>
      </div>

      {animais.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            Nenhum animal encontrado no momento.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {animais.map((animal) => (
            <AnimalCard key={animal.id} animal={animal} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AnimaisList;
