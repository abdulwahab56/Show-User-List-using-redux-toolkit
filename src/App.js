import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Routers from "./routes/Routers";
import { Provider } from "react-redux";
import { store } from "./app/store";

function App() {
  return (
    <div className="container">
      <Provider store={store}>
        <BrowserRouter>
          <Routers />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
