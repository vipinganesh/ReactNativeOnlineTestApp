import Navigation from "./Components/Navigation";
import { Provider } from "react-redux";
import store from "./Components/Actions";

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
