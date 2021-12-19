import { Card, Icon, Image, Form, Button,Message } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  answerQuestions,
  addAnswerToUser,
} from "../../state/actionCreators/answerQuestion";
import { useNavigate } from "react-router-dom";

export const AnswerQuestion = (props) => {
  const navigate = useNavigate();
  
  const question = props.question;
  const users = useSelector((state) => state.allUsers);
  const authedUser = useSelector((state) => state.authUser)[0].id;

  const [choosed, setAnswer] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const handleChange = (e, { value }) => setAnswer({ value });
  const { value } = choosed;
  const dispatch = useDispatch();

  // for back button
  const goBack = () => {
    navigate("/");
  };

  const handleSubmit = () => {
    if (choosed.value) {

      const qid = question.id;
      const answer = choosed.value;

      dispatch(answerQuestions({ authedUser, qid, answer }));
      dispatch(addAnswerToUser({ authedUser, qid, answer }));
      navigate(`/questions/${question.id}`, {
        replace: true,
        state: { showResults: true },
      });
    }
    else{
      setShowMessage(true)
    }
  };

  const matchedUser = Object.values(users).filter((user) => {
    if (user.id === question.author) {
      return user;
    }
  });

  const totalVotes =
    Object.keys(question.optionOne.votes).length +
    Object.keys(question.optionTwo.votes).length;

  return (
    <div className="QWrapper">
      <Card key={question.id} className="questionCard attached single">
        <Image
          className="questionAuthorIMG"
          src={matchedUser[0].avatarURL.src}
          wrapped
          size="large"
          ui={false}
        />

        <Card.Content className="QuestionContent QAnswer">
          
          <Card.Meta>
            <span className="date">{question.author} asks</span>
          </Card.Meta>
          <Card.Header as="h1">Would you rather</Card.Header>

          <Card.Description>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Radio
                  label={question.optionOne.text}
                  value={"optionOne"}
                  checked={value === "optionOne"}
                  onChange={handleChange}
                />
                <Form.Radio
                  label={question.optionTwo.text}
                  value={"optionTwo"}
                  checked={value === "optionTwo"}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Button positive>Submit</Form.Button>
              
            </Form>
            

          </Card.Description>
          
        </Card.Content>
        
        <Card.Content extra>
          <span>
            <Icon name="user" />
            {totalVotes}
            &nbsp; votes
          </span>
          <Button animated onClick={goBack}>
            <Button.Content visible>Back</Button.Content>
            <Button.Content hidden>
              <Icon name="arrow left" />
            </Button.Content>
          </Button>
        </Card.Content>
      </Card>
      {showMessage &&
      <Message  negative style={{width: '600px', margin: '0 auto'}}>
      <Icon name='exclamation' />
      you have to choose an option
    </Message>
}

    </div>
  );
};
