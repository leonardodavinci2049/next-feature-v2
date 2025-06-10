export default function LoadingProdutos() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="mb-8">
        <div className="h-8 bg-gray-200 rounded w-64 mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 animate-pulse"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-5 bg-gray-200 rounded w-16"></div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>

            <div className="flex justify-between items-center mb-4">
              <div className="h-8 bg-gray-200 rounded w-24"></div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </div>

            <div className="h-10 bg-gray-200 rounded w-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
