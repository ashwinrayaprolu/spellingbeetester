import React from "react";

export const Context = React.createContext({
    loading: false,
    results: {},
    randomList: [],
    generateNewTest: () => {},
    validateCurrentTest: () => {},
    setWordList: () => {},
    setCanRandomize: () => {},
    setFirstWordIndex: () => {},
    setLastWordIndex: () => {},
    setQuestionCount: () => {},
    updateAnswerFor: () => {}
  });
