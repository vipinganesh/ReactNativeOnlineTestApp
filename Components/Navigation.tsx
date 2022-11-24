import { NavigationContainer } from "@react-navigation/native";
import { Screen1 } from "../Screens/Screen1";
import { Screen2 } from "../Screens/Screen2";
import { Screen3 } from "../Screens/Screen3";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

type RootStackPramList = {
  Home: undefined;
  Question: { index: number };
  Result: undefined;
};
const Stack = createNativeStackNavigator<RootStackPramList>();

export function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: true }}
      >
        <Stack.Screen name="Home" component={Screen1} />
        <Stack.Screen name="Question" component={Screen2} />
        <Stack.Screen name="Result" component={Screen3} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
