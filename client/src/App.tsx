import { createBrowserRouter, RouterProvider } from "react-router-dom"
import MainPage from "./components/MainPage"
import ChatPage from "./components/Channel"
import CustomCursor from "./components/AnimaCurser"

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <MainPage />,
    },
      {
        path: "/channel",
        element: <ChatPage />,
      },
     
  ])

  return (
    <>
     <RouterProvider router={appRouter}></RouterProvider>
    <CustomCursor/>
     
    </>
  )
}

export default App
