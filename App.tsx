import Navigation from "./Components/Navigation";
import { Provider } from "react-redux";
import store from "./Components/Actions";
import "react-native-gesture-handler";

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
