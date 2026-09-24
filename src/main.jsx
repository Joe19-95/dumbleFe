import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router/dom'
import './index.css'
import router from './router.jsx'
import { store } from '../src/utils/appStore.js'
import { Provider } from 'react-redux'

document.documentElement.setAttribute(
  'data-theme',
  localStorage.getItem('dumble-theme') || 'light',
)

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
)
