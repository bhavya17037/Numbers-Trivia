import React, { useReducer } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import SearchBar from "../components/SearchBar";
import api from "../api/api";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const searchTextChanged = (state, action) => {
  return { ...state, text: action.payload };
};

const showResult = (state, action) => {
  return { ...state, res: action.payload };
};

const updateError = (state, action) => {
  return { ...state, res: action.payload };
};

const SearchScreen = () => {
  const [searchText, dispatch] = useReducer(searchTextChanged, {
    text: ""
  });
  const [results, updateRes] = useReducer(showResult, {
    res: ""
  });
  const [errMessage, setErrMessage] = useReducer(updateError, {
    text: ""
  });

  const searchAPI = async () => {
    try {
      const response = await api.get(
        "https://numbersapi.p.rapidapi.com/".concat(searchText.text, "/math")
      );
      console.log("haha");
      console.log(response.data);
      updateRes({ payload: response.data });
      setErrMessage({ payload: "" });
    } catch (err) {
      setErrMessage({ payload: "Oops! Something went wrong!" });
    }
  };

  return (
    <View style={styles.parentView}>
      <View>
        <SearchBar
          searchTerm={searchText.text}
          onTermChange={newText => {
            dispatch({ payload: newText });
          }}
          onTermSubmit={() => {
            searchAPI();
          }}
        />
        <Text />
      </View>
      <View style={styles.resultView}>
        <Text>{errMessage.text}</Text>
        <Text>{results.res}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parentView: {
    justifyContent: "flex-start",
    backgroundColor: "black",
    height: height
  },
  resultView: {
    backgroundColor: "yellow",
    height: 60,
    borderRadius: 5,
    marginHorizontal: 15
  },
  resultTextStyle: {
    fontSize: 18,
    alignSelf: "center",
    margin: 10
  }
});

export default SearchScreen;
