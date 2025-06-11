export default function AnimaisLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        {/* Skeleton do título da página */}
        <div className="h-10 bg-gray-200 animate-pulse rounded-md w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-200 animate-pulse rounded-md w-1/2"></div>
      </div>

      {/* Grid de skeleton dos cards de animais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            {/* Skeleton da imagem */}
            <div className="aspect-square bg-gray-200 animate-pulse"></div>

            {/* Skeleton do conteúdo */}
            <div className="p-4 space-y-3">
              {/* Skeleton do nome */}
              <div className="h-6 bg-gray-200 animate-pulse rounded-md w-3/4"></div>

              {/* Skeleton da descrição */}
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 animate-pulse rounded-md w-full"></div>
                <div className="h-4 bg-gray-200 animate-pulse rounded-md w-2/3"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
