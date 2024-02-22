import React from 'react'
import React from './login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path= '/' element = {<login />}> </Route>
        <Route path= '/signup' element = {<signup />}> </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
