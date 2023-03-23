import { Route, Routes } from 'react-router-dom'
import 'antd/dist/antd.css'

import List from './pages/List'
import Maker from './pages/Maker'
import View from './pages/View'
import './App.css'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<List />}></Route>
        <Route path="/shop/edit/:id" element={<Maker />}></Route>
        <Route path="/shop/preview/:id" element={<View />}></Route>
      </Routes>
    </div>
  )
}

export default App
