import {Provider} from "react-redux";
import {store} from "./redux/store.ts";
import {router} from "./routes/Routes.tsx";
import {RouterProvider} from "react-router-dom";

function App() {
  return (
      <Provider store={store}>
          <RouterProvider router={router}/>
      </Provider>
  )
}

export default App
