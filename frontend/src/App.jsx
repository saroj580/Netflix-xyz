import Body from "./components/Body"
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <div>
        <Body />
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#333',
              color: '#fff',
            },
          }}
        />
      </div>
    </>
  )
}

export default App

