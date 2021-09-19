import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Radio } from 'native-base';
import { decode } from 'html-entities';

export default Question = (props) => {
  const [value, setValue] = React.useState("");

  const questions = useSelector(state => state.app.questions);
  const questionIndex = useSelector(state => state.app.questionIndex);

  if (questions.length == 0 || questionIndex >= questions.length) {
    return (
      <View style={{
        alignItems: 'center'
      }}>
        <Text>
          {
            questions.length == 0 ? 'No questions' : 'Invalid question'
          }
        </Text>
      </View>
    )
  }

  const question = questions[questionIndex];

  return (
    <View style={styles.container}>
      <View style={styles.topWrapper}>
        <Text>
          Question: { questionIndex + 1 }/10
        </Text>
        <Text>{ props.timeString }</Text>
      </View>

      <Text style={styles.question}>
        { decode(question.question) }
      </Text>

      <Radio.Group
        value={value}
        onChange={(nextValue) => {
          setValue(nextValue);
          props.setCurrentValue(nextValue);
        }}
        style={styles.radioGroup}
      >
        {
          question.answers.map(answer => (
            <Radio value={answer} my={1} aria-label={answer} key={answer}>{decode(answer)}</Radio>
          ))
        }
      </Radio.Group>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          onPress={() => {
            props.nextQuestion(value);
            setValue("");
          }}
        >
          <Text>{ questionIndex == 9 ? "Show Result" : "Next Question" }</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  topWrapper: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  question: {
    marginTop: 50
  },
  radioGroup: {
    marginTop: 30
  },
  buttonWrapper: {
    marginTop: 30,
    alignItems: "center"
  }
});