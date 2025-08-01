import Layout from "./components/layout"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ThemeProvider } from "./context/theme-provider"
import WeatherDashboard from "./pages/weather-dashboard"
import CityPage from "./pages/city-page"
import { QueryClientProvider , QueryClient } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions:{
    queries: {
      staleTime: 5* 60 * 1000,
      gcTime: 10* 60 * 100, //10 minutes
      retry: false,
      refetchOnWindowFocus: false,
    }
  }
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>

      <BrowserRouter>
        <ThemeProvider defaultTheme="dark">
          <Layout>
            <Routes>
              <Route path="/" element={<WeatherDashboard />} />
              <Route path="/City/:cityname" element={<CityPage />} />
            </Routes>
          </Layout>
        </ThemeProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App