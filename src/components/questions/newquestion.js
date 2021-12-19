import { Card, Icon, Divider, Form, Header, Message } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { createQuestion } from "../../state/actionCreators/createQuestion";
import { useNavigate } from "react-router-dom";

export const NewQuestion = () => {
  const authedUser = useSelector((state) => state.authUser)[0].id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const [options, setOption] = useState({});

  // set the component state of the answer options with what the user type
  const handleChange = (e, { name, value }) => {
    setOption((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // dispatch the new question and then navigate to root ( where all questions appears)
  // if not the both options have value show error message
  const handleSubmit = () => {
    if (options.optionOne && options.optionTwo) {
      const optionOneText = options.optionOne;
      const optionTwoText = options.optionTwo;
      const author = authedUser;
      const newQuestion = { optionOneText, optionTwoText, author };
      dispatch(createQuestion(newQuestion));
      navigate("/");
    } else {
      setShowMessage(true);
    }
  };
  return (
    <div className="QWrapper newQ">
      <Header as="h2" className="QuestionHeader">
        <Icon name="question" />
        <Header.Content>New question</Header.Content>
      </Header>
      <Card className="questionCard single noborder">
        <Card.Content className="QuestionContent">
          <Card.Header as="h1">Would you rather</Card.Header>

          <Card.Description>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Input
                  placeholder="enter first option"
                  name="optionOne"
                  value={options.optionOneText}
                  className="optionField"
                  onChange={handleChange}
                />

                <Divider horizontal>Or</Divider>
                <Form.Input
                  placeholder="enter second option"
                  name="optionTwo"
                  value={options.optionTwoText}
                  className="optionField"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Button className="submitQ" positive>
                Submit
              </Form.Button>
            </Form>
          </Card.Description>
        </Card.Content>
        <Card.Content extra></Card.Content>
      </Card>
      {showMessage && (
        <Message negative style={{ width: "600px", margin: "0 auto" }}>
          <Icon name="exclamation" />
          you have to input the two options
        </Message>
      )}
    </div>
  );
};
