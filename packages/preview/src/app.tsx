import { Route, Routes } from 'react-router-dom'

import Home from "./pages/home/index";
import View from "./pages/view";
import 'antd/dist/antd.css'
import './app.css'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/preview" element={<Home />}></Route>
        <Route path="/view" element={<View />}></Route>
      </Routes>
    </div>
  )
}

export default App
