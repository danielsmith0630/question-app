import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import * as actions from './redux/actions';
import * as Config from './config';

import Question from './screens/Question';
import Result from './screens/Result';

class AppContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stage: 'question',
      isLoading: true,
      timeLeft: 20,
      timeString: "0:20",
      currentValue: ""
    };

    this.timer = 0;
  }

  componentDidMount() {
    this.initialize()
  }

  initialize = () => {
    this.props.setQuestions([]);
    this.props.setQuestionIndex(-1);
    this.props.setCorrectNum(0);

    this.setState({
      stage: 'question'
    });

    this.loadQuestions();
  };

  loadQuestions = async () => {
    this.setState({
      isLoading: true
    });

    const questions = await fetch(Config.API_URL)
      .then(response => response.json())
      .then(json => {
        return json.results;
      })
      .catch((error) => {
        console.error('ERROR in getting questions:', error);
        return [];
      });

    questions.forEach(question => {
      const answers = [
        question.correct_answer,
        ...question.incorrect_answers
      ]
    
      this.shuffle(answers);

      question.answers = answers
    });

    this.props.setQuestions(questions);
    this.nextQuestion("");

    this.setState({
      isLoading: false
    });
  }

  shuffle = array => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  nextQuestion = (value = "") => {
    clearInterval(this.timer);

    const { questionIndex, questions, correctNum } = this.props.state;

    if (questionIndex == -1) {
      this.props.setQuestionIndex(0);
    } else {
      const question = questions[questionIndex];

      if (value == question.correct_answer) {
        this.props.setCorrectNum(correctNum + 1);
      }

      if (questionIndex == 9) {
        this.setState({
          stage: "result"
        });
      } else {
        this.props.setQuestionIndex(questionIndex + 1);
      }
    }

    if (questionIndex < 9) {
      this.setState({
        timeLeft: 20,
        timeString: "0:20",
        currentValue: ""
      });

      this.timer = setInterval(() => {
        const { timeLeft, currentValue } = this.state;

        if (timeLeft > 1) {
          this.setState({
            timeLeft: timeLeft - 1,
            timeString: "0:" + (timeLeft > 10 ? "" : "0") + (timeLeft - 1)
          });
        } else {
          this.nextQuestion(currentValue);
        }
      }, 1000);
    }
  }

  setCurrentValue = value => {
    this.setState({
      currentValue: value
    });
  };

  render() {
    const { stage, isLoading, timeString } = this.state;

    if (isLoading) {
      return (
        <View style={{
          alignItems: 'center',
          paddingTop: 100
        }}>
          <Text>Loading ...</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        { stage == "question" ?
          <Question
            nextQuestion={this.nextQuestion}
            timeString={timeString}
            setCurrentValue={this.setCurrentValue}
          />
        :
          <Result
            testAgain={this.initialize}
          />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    width: '100%'
  }
});

const mapStateToProps = (state) => {
  return {
    state: state.app
  };
};

export default connect(mapStateToProps, actions)(AppContainer);