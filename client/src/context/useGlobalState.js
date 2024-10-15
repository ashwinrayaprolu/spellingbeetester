import { useState, useMemo } from "react";
import { getMultipleRandom } from "../utils";

/**
 * Common state shared by entire react tree
 * @returns 
 */
export const useGlobalState = () => {
  const [wordList, setWordList] = useState([]);
  const [randomList, setRandomList] = useState([]);
  const [answersList, setAnswersList] = useState([]);
  const [firstWordIndex, setFirstWordIndex] = useState(0);
  const [lastWordIndex, setLastWordIndex] = useState(10);
  const [canRandomize, setCanRandomize] = useState(true);
  const [questionCount, setQuestionCount] = useState(10);
  const [results, setResults] = useState({});

  const updateAnswerFor = (index,value) => {
    const nextAnswers = answersList.map((val, i) => {
      if (i === index) {
        // UPDATE THE VALUE
        return value;
      } else {
        // The rest haven't changed
        return val;
      }
    });
    setAnswersList(nextAnswers);
  }

  const generateNewTest = useMemo(
    () => () => {
      setWordList(wordList);
      setQuestionCount(questionCount);
      setFirstWordIndex(firstWordIndex);
      // Make sure lastwordIndex doesn't go out of bounds
      setLastWordIndex(lastWordIndex > wordList.length ? wordList.length - 1 : lastWordIndex);
      setCanRandomize(canRandomize);
      
      const currentList = wordList.slice(firstWordIndex, lastWordIndex);
      // Generate random question List
      if (canRandomize){
        let tempRandomList = getMultipleRandom(currentList, questionCount);
        setRandomList(tempRandomList)
        
        let tempAnswerArray = new Array();
        let tempResults = {};
        tempRandomList.map( (q,index ) => {
          tempAnswerArray.push('-----');
          tempResults[index]=false
        });
        setAnswersList(tempAnswerArray);
        setResults(tempResults);
      }

    }, [firstWordIndex, lastWordIndex, canRandomize, questionCount, wordList]
  );

  const validateCurrentTest = () => {
    let tempResults = {};
    answersList.map((val, i) => {
      if(val == randomList[i]){
        tempResults[i]=true;
      }else{
        tempResults[i]=false;
      }

    });
    setResults(tempResults);


  }

  return {
    loading: false,
    randomList,
    generateNewTest,
    validateCurrentTest,
    setWordList,
    setCanRandomize,
    setFirstWordIndex,
    setLastWordIndex,
    setQuestionCount,
    updateAnswerFor,
    results

  };
};
