import { View, StyleSheet, Text } from "react-native";
import {
  selectResultArray,
  selectQuestionArray,
} from "../Components/QuestionTypes";
import { useAppSelector } from "../Components/Hooks";
import React, { useState, useEffect } from "react";
import { PieChart } from "react-native-svg-charts";
import { Labels } from "../Components/Labels";

export function Screen3() {
  let resultArray = useAppSelector(selectResultArray);

  let questionArray = useAppSelector(selectQuestionArray);

  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState<number>(0);
  const [notAttempted, setNotAttempted] = useState<number>(0);

  const updateResult = () => {
    let correctcount = 0;
    resultArray.forEach((element, index) => {
      if (
        questionArray[element.index].answer.toString() ==
        element.answer.toString()
      ) {
        correctcount++;
      }
    });
    setCorrectAnswers(correctcount);
    resultArray = resultArray.filter(
      (obj) => !Object.values(obj).includes(null)
    );
    setNotAttempted(questionArray.length - resultArray.length);
    setIncorrectAnswers(resultArray.length - correctcount);
  };

  useEffect(() => {
    updateResult();
  }, []);

  const radius = 75;
  const circleCircumference = 2 * Math.PI * radius;
  const total = questionArray.length;
  const colors = ["green", "red", "grey"];
  const values = [
    "Correct Answers: ",
    "Incorrect Answers: ",
    "Not Attempted: ",
  ];
  const getPieChartData = (data: number[]) => {
    return data.map((item, index) => {
      return {
        key: values[index] + " " + item,
        value: item,
        svg: { fill: colors[index] },
      };
    });
  };

  const pieChartData = getPieChartData([
    correctAnswers,
    incorrectAnswers,
    notAttempted,
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.detailmainContainer}>
        <View style={styles.detailContainer}>
          <Text style={styles.textContainer}>Correct Answers: </Text>
          <Text style={styles.valueContainer}>{correctAnswers}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.textContainer}>Incorrect Answers: </Text>
          <Text style={styles.valueContainer}>{incorrectAnswers}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.textContainer}>Not Attempted: </Text>
          <Text style={styles.valueContainer}>{notAttempted}</Text>
        </View>
      </View>

      <View style={styles.scoreContainer}>
        <Text style={styles.scoreTextContainer}>Total Score: </Text>
        <Text style={styles.scoreValueContainer}>{correctAnswers}</Text>
      </View>

      <PieChart
        style={{ width: 300, height: 300 }}
        innerRadius={0}
        data={pieChartData}
        padAngle={0}
        labelRadius={120}
      >
        <Labels />
      </PieChart>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  detailmainContainer: {
    height: "30%",
    borderColor: "#00008B",
    borderRadius: 5,
    borderWidth: 3,
  },
  detailContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: 300,
    borderBottomColor: "#00008B",
    borderBottomWidth: 1,
  },
  textContainer: {
    textAlign: "left",
    padding: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
  valueContainer: {
    textAlign: "right",
    padding: 20,
    fontSize: 18,
  },
  scoreContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "78%",
    height: 80,
    alignItems: "center",
    padding: "6%",
    backgroundColor: "#00008B",
    marginBottom: 20,
  },
  scoreTextContainer: {
    fontSize: 20,
    color: "white",
  },
  scoreValueContainer: {
    fontSize: 20,
    color: "white",
  },
});

export default Screen3;
