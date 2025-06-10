export default function ProductLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Skeleton da imagem do produto */}
        <div className="aspect-square bg-gray-200 animate-pulse rounded-lg"></div>
        
        {/* Skeleton das informações do produto */}
        <div className="space-y-6">
          {/* Skeleton do título */}
          <div className="h-8 bg-gray-200 animate-pulse rounded-md w-3/4"></div>
          
          {/* Skeleton do preço */}
          <div className="h-6 bg-gray-200 animate-pulse rounded-md w-1/4"></div>
          
          {/* Skeleton da avaliação */}
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-5 h-5 bg-gray-200 animate-pulse rounded"></div>
            ))}
          </div>
          
          {/* Skeleton da descrição */}
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 animate-pulse rounded-md w-full"></div>
            <div className="h-4 bg-gray-200 animate-pulse rounded-md w-5/6"></div>
            <div className="h-4 bg-gray-200 animate-pulse rounded-md w-4/6"></div>
          </div>
          
          {/* Skeleton do botão */}
          <div className="h-12 bg-gray-200 animate-pulse rounded-md w-full"></div>
        </div>
      </div>
    </div>
  );
}
