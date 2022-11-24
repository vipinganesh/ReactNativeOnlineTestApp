import { RootState } from "../Components/Actions";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QuestionObject, ResultObject } from "../Components/QuestionObject";

const initialState: {
  questionArray: QuestionObject[];
  resultArray: ResultObject[];
  language: String;
} = {
  questionArray: [
    {
      index: 0,
      question: ["React Native has", " basic Components?"],
      questionType: "fillInBlanks",
      answer: ["12"],
      options: [],
    },
    {
      index: 1,
      question: ["________is used to create immutable stylesheet references?"],
      questionType: "multipleChoice",
      answer: ["stylesheet"],
      options: ["Interaction manager", "Redux", "stylesheet", "none"],
    },
    {
      index: 2,
      question: ["Virtual DOM creates a copy of the whole DOM object"],
      questionType: "boolean",
      answer: ["True"],
      options: ["True", "False"],
    },
    {
      index: 3,
      question: ["Mirror", "Firefly", "Pinhole Camera", "Moon"],
      questionType: "matches",
      answer: ["Reflection", "Luminous", "Inverted Image", "Non-Luminous"],
      options: ["Non-Luminous", "Inverted Image", "Reflection", "Luminous"],
    },
    {
      index: 4,
      question: ["Component lifecycle consists of?"],
      questionType: "multiSelect",
      answer: ["Mounting Phase", "Update Phase", "Unmounting Phase"],
      options: [
        "Initialization Phase",
        "Mounting Phase",
        "Update Phase",
        "Unmounting Phase",
        "DOMPhase",
      ],
    },
  ],
  resultArray: [],
  language: "en",
};

type IActionTypeLanguage = {
  language: String;
};

type IActionTypeAnswer = {
  index: number;
  answer: String[];
};

export const QuestionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    setLanguageValue: (state, action: PayloadAction<IActionTypeLanguage>) => {
      state.language = action.payload.language;
    },
    setAnswer: (state, action: PayloadAction<IActionTypeAnswer>) => {
      state.resultArray[action.payload.index] = {
        index: action.payload.index,
        answer: action.payload.answer,
      };
    },
  },
});

export const { setLanguageValue, setAnswer } = QuestionSlice.actions;

export const selectQuestionArray = (state: RootState) =>
  state.question.questionArray;

export const selectLanguage = (state: RootState) => state.question.language;

export const selectResultArray = (state: RootState) =>
  state.question.resultArray;

export default QuestionSlice.reducer;
