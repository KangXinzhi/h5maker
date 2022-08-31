import './App.css'
import { Route, Routes } from 'react-router-dom'
import List from './pages/List'
import 'antd/dist/antd.css'
import Maker from './pages/Maker'
import View from './pages/View'

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
