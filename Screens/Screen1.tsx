import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Pressable,
} from "react-native";
import { useEffect, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/core";
import { FloatingLabelInput } from "react-native-floating-label-input";
import DropDownPicker from "react-native-dropdown-picker";
import { useAppDispatch } from "../Components/Hooks";
import { setLanguageValue } from "../Components/QuestionTypes";

type RootStackPramList = {
  Home: undefined;
  Question: { index: number };
  Result: undefined;
};

export function Screen1() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackPramList>>();
  const dispatch = useAppDispatch();

  const [name, setName] = useState<String>("");
  const [email, setEmail] = useState<String>("");
  const [phone, setPhone] = useState<String>("");

  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState<String>("");
  const [items, setItems] = useState([
    { label: "English", value: "en" },
    { label: "Hindi", value: "hi" },
    { label: "German", value: "ger" },
    { label: "French", value: "fre" },
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.floatcontainer}>
        <FloatingLabelInput
          containerStyles={styles.inputContainer}
          labelStyles={styles.inputLabelContainer}
          inputStyles={styles.inputValue}
          label={"Name"}
          value={name.toString()}
          onChangeText={(name) => setName(name)}
        />
        <FloatingLabelInput
          containerStyles={styles.inputContainer}
          labelStyles={styles.inputLabelContainer}
          inputStyles={styles.inputValue}
          label={"Email"}
          value={email.toString()}
          onChangeText={(email) => setEmail(email)}
        />
        <FloatingLabelInput
          containerStyles={styles.inputContainer}
          labelStyles={styles.inputLabelContainer}
          inputStyles={styles.inputValue}
          label={"Phone"}
          value={phone.toString()}
          onChangeText={(phone) => setPhone(phone)}
        />
        <DropDownPicker
          open={open}
          value={language.toString()}
          items={items}
          setOpen={setOpen}
          setValue={setLanguage}
          setItems={setItems}
          textStyle={{ color: "#49658c" }}
          style={styles.dropdown}
        />
      </View>
      <Pressable
        style={
          name && email && phone && language
            ? styles.button
            : styles.disabledButton
        }
        disabled={!(name && email && phone && language)}
        onPress={() => {
          dispatch(setLanguageValue({ language }));
          navigation.navigate("Question", { index: 0 });
        }}
      >
        <Text style={styles.pressableText}>Start Test</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  floatcontainer: {
    flexGrow: 0,
    zIndex: 1,
    width: "70%",
  },
  inputContainer: {
    height: 60,
    width: 220,
    marginBottom: 10,
    flex: 0,
  },
  inputLabelContainer: {
    backgroundColor: "white",
  },
  inputValue: {
    borderColor: "black",
    borderWidth: 1,
    padding: 15,
    borderRadius: 7,
    height: "1%",
  },
  button: {
    backgroundColor: "#272c48",
    borderRadius: 5,
    fontSize: 18,
    padding: 15,
    marginBottom: 25,
    width: 175,
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "lightgrey",
    borderRadius: 5,
    fontSize: 18,
    padding: 15,
    width: 175,
    justifyContent: "center",
    alignItems: "center",
  },
  pressableText: {
    color: "#ffffff",
    fontSize: 18,
  },
  dropdown: {
    marginBottom: 20,
    backgroundColor: "white",
    height: 60,
  },
});

export default Screen1;
