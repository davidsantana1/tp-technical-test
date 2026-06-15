import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <main className="bg-black text-white min-h-screen">
          <h1 className="text-2xl font-bold">Hello World</h1>
        </main>
      </QueryClientProvider>
    </>
  )
}

export default App
