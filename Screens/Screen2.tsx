import { RouteProp, useNavigation, useRoute } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useAppSelector, useAppDispatch } from "../Components/Hooks";
import { selectQuestionArray } from "../Components/QuestionTypes";
import i18next from "../Components/i18n";
import { useTranslation } from "react-i18next";
import { selectLanguage, selectResultArray } from "../Components/QuestionTypes";
import DraggableFlatList, {
  ScaleDecorator,
  ShadowDecorator,
  OpacityDecorator,
} from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { setAnswer } from "../Components/QuestionTypes";
import { Provider as PaperProvider } from "react-native-paper";
import { RadioButton } from "react-native-paper";
import { CheckBox } from "@rneui/themed";

type RootStackPramList = {
  Home: undefined;
  Question: { index: number };
  Result: undefined;
};

export function Screen2() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackPramList>>();

  const route = useRoute<RouteProp<RootStackPramList, "Question">>();
  const inputIndex = route.params.index;

  const questionArray = useAppSelector(selectQuestionArray);
  const resultArray = useAppSelector(selectResultArray);
  const language = useAppSelector(selectLanguage);
  const dispatch = useAppDispatch();

  const { t, i18n } = useTranslation("en");

  const [fillInAnswer, setFillInAnswer] = useState<String>("");
  let [multiSelectAnswer, setMultiSelectAnswer] = useState<String[]>([]);

  useEffect(() => {
    i18n
      .changeLanguage(language.toString())
      .then(() => console.log(language))
      .catch((err) => console.log(err));
  }, []);

  type Item = {
    key: string;
    label: string;
  };

  const initialData: Item[] = questionArray[inputIndex].options.map(
    (element, index) => {
      return {
        key: `item-${index}`,
        label: element.toString(),
      };
    }
  );

  const [data, setData] = useState(JSON.stringify(initialData));
  useEffect(() => {
    setData(JSON.stringify(initialData));
  }, [JSON.stringify(initialData)]);
  const ref = useRef(null);
  const renderItem = ({ item, drag, isActive }) => {
    return (
      <ScaleDecorator>
        <OpacityDecorator activeOpacity={0.5}>
          <ShadowDecorator>
            <TouchableOpacity
              disabled={isActive}
              style={[
                styles.rowItem,
                {
                  height: 60,
                  width: 150,
                  flexDirection: "row",
                  borderColor: "lightgrey",
                  borderWidth: 1,
                  margin: "2%",
                  padding: "3%",
                  backgroundColor: isActive ? "red" : "white",
                  elevation: isActive ? 30 : 1,
                },
              ]}
              onLongPress={drag}
            >
              <Animated.View>
                <Text style={styles.matchesQuestionContainer}>
                  {i18next.t(JSON.parse(JSON.stringify(item)).label)}
                </Text>
              </Animated.View>
            </TouchableOpacity>
          </ShadowDecorator>
        </OpacityDecorator>
      </ScaleDecorator>
    );
  };

  return (
    <PaperProvider>
      <GestureHandlerRootView
        style={{ flex: 1, width: "100%", height: "100%" }}
      >
        <View style={styles.container}>
          <View style={styles.questionSelectionContainer}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
            >
              {[...Array(questionArray.length)].map((element, index) => {
                return (
                  <View key={index}>
                    <Pressable
                      key={index}
                      style={
                        resultArray[index]
                          ? styles.questionButton
                          : styles.questionButtonDisabled
                      }
                      onPress={() => {
                        let props = {
                          index: index,
                        };
                        navigation.navigate("Question", { ...props });
                      }}
                    >
                      <Text style={styles.questionButtonText}>{index + 1}</Text>
                    </Pressable>
                  </View>
                );
              })}
            </ScrollView>
          </View>
          <View style={styles.questionMainContainer}>
            {questionArray[inputIndex].questionType.toString() === "matches" ? (
              <>
                <Text style={styles.questionTextContainer}>
                  Q. {inputIndex}. {i18next.t("Match the following")}
                </Text>
                <View style={styles.questionMatchesContainer}>
                  <View>
                    {questionArray[inputIndex].question.map(
                      (element, index) => {
                        return (
                          <View
                            style={[
                              styles.optionButtonContainer,
                              { height: 58 },
                            ]}
                            key={index}
                          >
                            <Text
                              key={index}
                              style={styles.matchesQuestionContainer}
                            >
                              {i18next.t(element.toString())}
                            </Text>
                          </View>
                        );
                      }
                    )}
                  </View>
                  <GestureHandlerRootView>
                    <DraggableFlatList
                      ref={ref}
                      data={JSON.parse(data)}
                      keyExtractor={(item) => item?.key?.toString()}
                      onDragEnd={({ data, from, to }) => {
                        setData(JSON.stringify(data));
                        const updatedData: String[] = data.map(
                          (element, index) => {
                            return element.label;
                          }
                        );
                        dispatch(
                          setAnswer({ index: inputIndex, answer: updatedData })
                        );
                      }}
                      renderItem={renderItem}
                      containerStyle={{ flex: 1, width: "100%", paddingTop: 3 }}
                      style={{ flex: 1 }}
                    />
                  </GestureHandlerRootView>
                </View>
              </>
            ) : (
              <View>
                {questionArray[inputIndex].questionType === "fillInBlanks" ? (
                  <View style={styles.fillInQuestionContainer}>
                    <View>
                      <Text style={styles.questionTextContainer}>
                        Q. {inputIndex + 1}.{" "}
                        {i18next.t(
                          questionArray[inputIndex].question[0].toString()
                        )}
                      </Text>
                    </View>
                    <TextInput
                      style={styles.fillInContainer}
                      onChangeText={(newAnswer) => {
                        setFillInAnswer(newAnswer);
                        dispatch(
                          setAnswer({ index: inputIndex, answer: [newAnswer] })
                        );
                      }}
                    />
                    <View>
                      <Text style={styles.questionTextContainer}>
                        {i18next.t(
                          questionArray[inputIndex].question[1].toString()
                        )}
                      </Text>
                    </View>
                  </View>
                ) : (
                  <>
                    <Text style={styles.questionTextContainer}>
                      Q. {inputIndex + 1}.{" "}
                      {i18next.t(
                        questionArray[inputIndex].question[0].toString()
                      )}
                    </Text>
                    <View style={styles.optionContainer}>
                      {questionArray[inputIndex].questionType ===
                      "multiSelect" ? (
                        <View>
                          {questionArray[inputIndex].options.map(
                            (optionElement, optionIndex) => {
                              return (
                                <View
                                  style={[
                                    styles.optionButtonContainer,
                                    { padding: 0 },
                                  ]}
                                  key={optionIndex}
                                >
                                  <CheckBox
                                    title={i18next
                                      .t(optionElement.toString())
                                      .toString()}
                                    checked={multiSelectAnswer.includes(
                                      optionElement
                                    )}
                                    onPress={() => {
                                      if (
                                        multiSelectAnswer.includes(
                                          optionElement.toString()
                                        )
                                      ) {
                                        setMultiSelectAnswer(
                                          multiSelectAnswer.filter(
                                            (element, index) =>
                                              element !==
                                              optionElement.toString()
                                          )
                                        );
                                        dispatch(
                                          setAnswer({
                                            index: inputIndex,
                                            answer: multiSelectAnswer.filter(
                                              (element, index) =>
                                                element !==
                                                optionElement.toString()
                                            ),
                                          })
                                        );
                                      } else {
                                        setMultiSelectAnswer(
                                          multiSelectAnswer.concat(
                                            optionElement.toString()
                                          )
                                        );
                                        dispatch(
                                          setAnswer({
                                            index: inputIndex,
                                            answer: multiSelectAnswer.concat(
                                              optionElement.toString()
                                            ),
                                          })
                                        );
                                      }
                                    }}
                                    textStyle={{
                                      fontSize: 16,
                                      fontWeight: "normal",
                                      fontFamily: "sans-serif",
                                    }}
                                  />
                                </View>
                              );
                            }
                          )}
                        </View>
                      ) : (
                        <RadioButton.Group
                          onValueChange={(newAnswer) => {
                            setFillInAnswer(newAnswer);
                            dispatch(
                              setAnswer({
                                index: inputIndex,
                                answer: [newAnswer],
                              })
                            );
                          }}
                          value={fillInAnswer.toString()}
                        >
                          {questionArray[inputIndex].options.map(
                            (element, index) => {
                              return (
                                <View
                                  style={[
                                    styles.optionButtonContainer,
                                    { padding: 0 },
                                  ]}
                                  key={index}
                                >
                                  <RadioButton.Item
                                    label={i18next.t(element.toString())}
                                    value={element.toString()}
                                    style={{
                                      flexDirection: "row-reverse",
                                      alignSelf: "flex-start",
                                    }}
                                  />
                                </View>
                              );
                            }
                          )}
                        </RadioButton.Group>
                      )}
                    </View>
                  </>
                )}
              </View>
            )}
          </View>
          <View style={styles.footerContainer}>
            <View style={styles.navigateButtonContainer}>
              <Pressable
                style={inputIndex !== 0 ? styles.button : styles.disabledButton}
                disabled={inputIndex === 0}
                onPress={() => {
                  let props = {
                    index: inputIndex - 1,
                  };
                  navigation.navigate("Question", { ...props });
                }}
              >
                <Text style={styles.pressableText}>Previous</Text>
              </Pressable>
              <Pressable
                style={
                  inputIndex !== questionArray.length - 1
                    ? styles.button
                    : styles.disabledButton
                }
                disabled={inputIndex === questionArray.length - 1}
                onPress={() => {
                  let props = {
                    index: inputIndex + 1,
                  };
                  navigation.navigate("Question", { ...props });
                }}
              >
                <Text style={styles.pressableText}>Next</Text>
              </Pressable>
            </View>
            <View style={styles.submitButtonContainer}>
              <Pressable
                style={
                  inputIndex === questionArray.length - 1
                    ? styles.button
                    : styles.disabledButton
                }
                disabled={inputIndex !== questionArray.length - 1}
                onPress={() => {
                  navigation.navigate("Result");
                }}
              >
                <Text style={styles.pressableText}>Submit</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </GestureHandlerRootView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  questionMainContainer: {
    width: "90%",
    marginTop: "7%",
    height: "60%",
    padding: "10%",
    paddingTop: "15%",
    elevation: 5,
    position: "absolute",
    top: 70,
  },
  questionTextContainer: {
    fontFamily: "sans-serif",
    fontSize: 16,
    flexWrap: "wrap",
  },
  button: {
    backgroundColor: "#272c48",
    borderRadius: 5,
    fontSize: 18,
    padding: 10,
    marginBottom: 30,
    width: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  pressableText: {
    color: "#ffffff",
    fontSize: 18,
  },
  disabledButton: {
    backgroundColor: "lightgrey",
    borderRadius: 5,
    fontSize: 18,
    padding: 10,
    marginBottom: 30,
    width: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  questionSelectionContainer: {
    flexDirection: "row",
    position: "absolute",
    top: 0,
    paddingTop: "3%",
  },
  questionButton: {
    justifyContent: "space-around",
    padding: 18,
    borderRadius: 50,
    backgroundColor: "red",
    margin: 5,
  },
  questionButtonDisabled: {
    justifyContent: "space-around",
    padding: 18,
    borderRadius: 50,
    backgroundColor: "grey",
    margin: 5,
  },
  rowItem: {
    height: 100,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  questionButtonText: {
    color: "white",
  },
  questionMatchesContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "10%",
  },
  matchesQuestionContainer: {
    padding: 8.5,
    fontFamily: "sans-serif",
    fontSize: 14,
  },
  optionContainer: {
    paddingTop: "5%",
  },
  optionTextContainer: {
    textAlignVertical: "center",
  },
  fillInContainer: {
    minWidth: "20%",
    fontFamily: "sans-serif",
    fontSize: 16,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  navigateButtonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "99%",
  },
  fillInQuestionContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
  optionButtonContainer: {
    flexDirection: "row",
    borderColor: "#272c48",
    borderWidth: 0.1,
    margin: "2%",
    padding: "3%",
    elevation: 1,
  },
  footerContainer: {
    position: "absolute",
    bottom: 0,
  },
  submitButtonContainer: {
    alignItems: "center",
    margin: "2%",
  },
});

export default Screen2;
