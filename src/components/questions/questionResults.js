import {
  Card,
  Icon,
  Image,
  Header,
  Segment,
  Label,
  Progress,
  Button
} from "semantic-ui-react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const QuestionResults = (props) => {
  const questions_list = useSelector((state) => state.questions);
  const users = useSelector((state) => state.allUsers);
  const authUser = useSelector((state) => state.authUser)[0].id;
  const param = useParams();
  const navigate = useNavigate();


  const questionID = param.question_id;
  let question = Object.values(questions_list).filter(
    (q) => q.id === questionID
  )[0];

    // for back button
    const goBack = () => {
      navigate('/')
    }

  const matchedUser = Object.values(users).filter((user) => {
    if (user.id === question.author) {
      return user;
    }
  });

  const totalVotes =
    Object.keys(question.optionOne.votes).length +
    Object.keys(question.optionTwo.votes).length;

  const optionOneVotes = Object.keys(question.optionOne.votes).length;
  const optionTwoVotes = Object.keys(question.optionTwo.votes).length;

  return (
    <div className="QWrapper">
      {(question.optionOne.votes.includes(authUser) ||
        question.optionTwo.votes.includes(authUser)) && (
        <Card key={question.id} className="questionCard single">
          <Image
            className="questionAuthorIMG"
            src={matchedUser[0].avatarURL.src}
            wrapped
            size="large"
            ui={false}
          />

          <Card.Content className="QuestionContent">
            <Card.Meta>
              <span className="date">{question.author} asked</span>
            </Card.Meta>
            <Card.Header as="h1">Would you rather</Card.Header>

            <Card.Description>
              <Segment className="result">
                {question.optionOne.text}
                {question.optionOne.votes.includes(authUser) && (
                  <Label color="blue" ribbon>
                    your answer
                  </Label>
                )}
                <Progress
                  percent={Math.floor((optionOneVotes / totalVotes) * 100)}
                  progress
                />
                <Header as="h5" textAlign="center" >
                  {optionOneVotes} of 
                  {totalVotes}
                </Header>
              </Segment>

              <Segment className="result">
                {question.optionTwo.text}
                {question.optionTwo.votes.includes(authUser) && (
                  <Label color="blue" ribbon>
                    your answer
                  </Label>
                )}
                <Progress
                  percent={Math.floor((optionTwoVotes / totalVotes) * 100)}
                  progress
                />
                <Header as="h5" textAlign="center">
                  {optionTwoVotes} of 
                  {totalVotes}
                </Header>
              </Segment>
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
      )}
    </div>
  );
};
