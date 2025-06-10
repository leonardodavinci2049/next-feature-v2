# GitHub Copilot Instructions

## Padrões de Código

- Use TypeScript para todos os arquivos
- Prefira arrow functions para componentes React
- Use named exports ao invés de default exports
- Implemente tratamento de erro com try/catch
- Adicione comentários JSDoc para funções públicas

## Estrutura de Pastas

- Componentes em `src/components/`
- Hooks customizados em `src/hooks/`
- Utilities em `src/utils/`
- Types em `src/types/`

## Convenções de Nomenclatura

- Componentes: PascalCase
- Arquivos: kebab-case
- Variáveis e funções: camelCase
- Constantes: UPPER_SNAKE_CASE

## Bibliotecas Preferidas

- Styling: Tailwind CSS Version 4
- Forms: React Hook Form + Zod
- HTTP Client: Fetch API nativo

## Padrões de Segurança

- Sempre validar inputs do usuário
- Sanitizar dados antes de renderizar
- Usar environment variables para dados sensíveis
