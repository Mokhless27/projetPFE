import React, { Fragment, Component } from "react";
import { Helmet } from "react-helmet";
import questions from "../../questions.json";
import isEmpty from "../../utils/is-empty";
import M from "materialize-css";
import correctNotifcation from "../../assets/audio/correct-answer.mp3";
import wrongNotifcation from "../../assets/audio/wrong-answer.mp3";
import buttonSound from "../../assets/audio/button-sound.mp3";
import classnames from "classnames";
import { connect } from "react-redux";
import { createPref, updatePref } from "../../redux/actions/play";

class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions,
      currentQuestion: {},
      nextQuestion: {},
      previousQuestion: {},
      answer: "",
      numberOfQuestions: 0,
      numberOfAnsweredQuestions: 0,
      currentQuestionIndex: 0,
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      nextButtonDisabled: false,
      previousButtonDisabled: true,
      responses: []
    };

    this.correctSound = React.createRef();
    this.wrongSound = React.createRef();
    this.buttonSound = React.createRef();
  }

  componentDidMount() {
    const {
      questions,
      currentQuestion,
      previousQuestion,
      nextQuestion
    } = this.state;
    this.displayQuestions(
      questions,
      currentQuestion,
      nextQuestion,
      previousQuestion
    );
    //console.log(this.props.auth.user.id);
  }

  displayQuestions = (
    questions = this.state.questions,
    currentQuestion,
    nextQuestion,
    previousQuestion
  ) => {
    let { currentQuestionIndex } = this.state;
    if (!isEmpty(this.state.questions)) {
      questions = this.state.questions;
      currentQuestion = questions[currentQuestionIndex];
      nextQuestion = questions[currentQuestionIndex + 1];
      previousQuestion = questions[currentQuestionIndex - 1];
      const answer = currentQuestion.answer;
      this.setState(
        {
          currentQuestion,
          nextQuestion,
          previousQuestion,
          numberOfQuestions: questions.length,
          answer
        },
        () => {
          this.handleDisabledButton();
        }
      );
    }
  };

  handleOptionClick = e => {
    setTimeout(() => {
      this.correctSound.current.play();
    }, 500);
    this.wrongAnswer(e.target.innerHTML.toLowerCase());
  };

  // handleOptionClick = e => {
  //   if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
  //     setTimeout(() => {
  //       // document.getElementById("correct-sound").play();
  //       this.correctSound.current.play();
  //     }, 500);
  //     console.log(e.target.innerHTML.toLowerCase());

  //     this.correctAnswer(e.target.innerHTML.toLowerCase());
  //   } else {
  //     setTimeout(() => {
  //       //document.getElementById("wrong-sound").play();
  //       this.wrongSound.current.play();
  //     }, 500);

  //     this.wrongAnswer();
  //   }
  // };

  handleNextButtonClick = () => {
    this.playButtonsound();
    if (this.state.nextQuestion !== undefined) {
      this.setState(
        prevState => ({
          currentQuestionIndex: prevState.currentQuestionIndex + 1
        }),
        () => {
          this.displayQuestions(
            this.state.questions,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      );
    }
  };

  handlePreviousButtonClick = () => {
    this.playButtonsound();
    if (this.state.previousQuestion !== undefined) {
      this.setState(
        prevState => ({
          currentQuestionIndex: prevState.currentQuestionIndex - 1
        }),
        () => {
          this.displayQuestions(
            this.state.questions,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      );
    }
  };

  handleQuitButtonClick = () => {
    this.playButtonsound();
    if (window.confirm("Are you sure you want to quit ?")) {
      this.props.history.push("/");
    }
  };

  handleButtonClick = e => {
    switch (e.target.id) {
      case "next-button":
        this.handleNextButtonClick();
        break;
      case "previous-button":
        this.handlePreviousButtonClick();
        break;
      case "quit-button":
        this.handleQuitButtonClick();
        break;

      default:
        break;
    }
  };

  playButtonsound = () => {
    //document.getElementById("button-sound").play();
    this.buttonSound.current.play();
  };

  correctAnswer = response => {
    M.toast({
      html: "Correct Answer!",
      classes: "toast-valid",
      displayLength: 500
    });

    this.setState(
      prevState => ({
        //score: prevState.score + 1,
        correctAnswers: prevState.correctAnswers + 1,
        correctQuestionIndex: prevState.correctQuestionIndex + 1,
        numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1,
        responses: [...this.state.responses, response]
      }),
      () => {
        if (this.state.nextQuestion === undefined) {
          this.endGame();
        } else {
          this.displayQuestions(
            this.state.questions,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      }
    );
  };

  wrongAnswer = response => {
    navigator.vibrate(1000);
    M.toast({
      html: "Answer Registered",
      classes: "toast-valid",
      displayLength: 1500
    });

    this.setState(
      prevState => ({
        //wrongAnswers: prevState.wrongAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1,
        responses: [...this.state.responses, response]
      }),
      () => {
        if (this.state.nextQuestion === undefined) {
          this.endGame();
        } else {
          this.displayQuestions(
            this.state.questions,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      }
    );
  };

  handleDisabledButton = () => {
    if (
      this.state.previousQuestion === undefined ||
      this.state.currentQuestionIndex === 0
    ) {
      this.setState({
        previousButtonDisabled: true
      });
    } else {
      this.setState({
        previousButtonDisabled: false
      });
    }

    if (
      this.state.nextQuestion === undefined ||
      this.state.currentQuestionIndex + 1 === this.state.numberOfQuestions
    ) {
      this.setState({
        nextButtonDisabled: true
      });
    } else {
      this.setState({
        nextButtonDisabled: false
      });
    }
  };

  endGame = () => {
    alert("Quiz has ended!");
    const { state } = this;
    const playerStats = {
      score: state.score,
      numberOfQuestions: state.numberOfQuestions,
      numberOfAnsweredQuestions: state.numberOfAnsweredQuestions,
      correctAnswers: state.correctAnswers,
      wrongAnswers: state.wrongAnswers,
      responses: state.responses
    };

    console.log(
      playerStats.responses[1],
      playerStats.responses[2],
      playerStats.responses[3],
      playerStats.responses[4],
      playerStats.responses[5],
      playerStats.responses[6],
      playerStats.responses[7]
    );

    if (this.props.auth.user.preferenceId == null) {
      this.props.createPref(this.props.auth.user.id, {
        color: playerStats.responses[0],
        personality: playerStats.responses[4],
        dominateAccessorie: playerStats.responses[5],
        outwearTry: playerStats.responses[6],
        steroitype: playerStats.responses[7],
        fashionable: playerStats.responses[3],
        moneySpendedByMonth: playerStats.responses[1],
        timesByMonth: playerStats.responses[2],
        name: this.props.auth.user.username
      });
    } else {
      this.props.updatePref(this.props.auth.user.preferenceId, {
        color: playerStats.responses[0],
        personality: playerStats.responses[4],
        dominateAccessorie: playerStats.responses[5],
        outwearTry: playerStats.responses[6],
        steroitype: playerStats.responses[7],
        fashionable: playerStats.responses[3],
        moneySpendedByMonth: playerStats.responses[1],
        timesByMonth: playerStats.responses[2],
        name: this.props.auth.user.username
      });
    }

    setTimeout(() => {
      this.props.history.push("/");
    }, 1000);
  };

  render() {
    const {
      currentQuestion,
      currentQuestionIndex,
      numberOfQuestions
    } = this.state;
    return (
      <Fragment>
        <Helmet>
          <title>Quiz Page</title>
        </Helmet>
        <Fragment>
          <audio
            ref={this.correctSound}
            //id="correct-sound"
            src={correctNotifcation}
          ></audio>
          <audio
            ref={this.wrongSound}
            //id="wrong-sound"
            src={wrongNotifcation}
          ></audio>
          <audio
            ref={this.buttonSound}
            // id="button-sound"
            src={buttonSound}
          ></audio>
        </Fragment>
        <div className="questions">
          <h2>Quiz Mode</h2>
          {/* <div className="lifeline-container">
            <p>
              <span className="mdi mdi-set-center mdi-24px lifeline-icon"></span>
              2
            </p>

            <p>
              <span className="mdi mdi-lightbulb-on-outline mdi-24px lifeline-icon"></span>
              <span className="lifeline">5</span>
            </p>
          </div> */}
          <div>
            <p>
              <span className="right">
                <span className="mdi mdi-clock-outline mdi-24px"></span>
              </span>

              <span className="left" style={{ float: "left" }}>
                {currentQuestionIndex + 1} of {numberOfQuestions}
              </span>
            </p>
          </div>
          <h5>{currentQuestion.question}</h5>
          <div className="options-container">
            <p onClick={this.handleOptionClick} className="option">
              {currentQuestion.optionA}
            </p>
            <p onClick={this.handleOptionClick} className="option">
              {currentQuestion.optionB}
            </p>
          </div>
          <div className="options-container">
            <p onClick={this.handleOptionClick} className="option">
              {currentQuestion.optionC}
            </p>
            <p onClick={this.handleOptionClick} className="option">
              {currentQuestion.optionD}
            </p>
          </div>
          <div className="button-container">
            <button
              className={classnames("", {
                disable: this.state.previousButtonDisabled
              })}
              id="previous-button"
              onClick={this.handleButtonClick}
            >
              Previous
            </button>
            <button
              className={classnames("", {
                disable: this.state.nextButtonDisabled
              })}
              id="next-button"
              onClick={this.handleButtonClick}
            >
              Next
            </button>
            <button id="quit-button" onClick={this.handleButtonClick}>
              Quit
            </button>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { createPref, updatePref })(Play);
