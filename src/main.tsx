import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import Router from './router'

// instancimaos react-query
const queryCLient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryCLient}>
      <Router />
    </QueryClientProvider>
  </React.StrictMode>,
)

/* esta madre del react-query es muy parecido al contex que vimos en clase */