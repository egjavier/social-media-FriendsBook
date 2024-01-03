import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./Components/Layout"
import LoginPage from "./Pages/Login/LoginPage"
import RegisterPage from "./Pages/Register/RegisterPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LoginPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Routes>
    
    </BrowserRouter>
  )
}

export default App
