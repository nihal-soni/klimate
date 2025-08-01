import Layout from "./components/layout"
import { BrowserRouter, Route , Routes } from "react-router-dom"
import { ThemeProvider } from "./context/theme-provider"
import WeatherDashboard from "./pages/weather-dashboard"
import CityPage from "./pages/city-page"


const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<WeatherDashboard/>} />
            <Route path="/City/:cityname" element={<CityPage/>} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App