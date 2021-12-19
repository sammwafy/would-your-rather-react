import { Card, Icon, Image, Button } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { SingleQuestion } from "./SingleQuestion";

export const QuestionCard = (props) => {
  const [question] = useState(props.question);
  const [answer, setAnswer] = useState({});
  const users = useSelector((state) => state.allUsers);
  const handleChange = (e, { value }) => setAnswer({ value });
  const { value } = answer;

  const matchedUser = Object.values(users).filter((user) => {
    if (user.id === question.author) {
      return user;
    }
  });

  return (
    question !== "" && (
      <div className="QWrapper">
        <Card key={question.id} className="questionCard">
          <Image
            className="questionAuthorIMG"
            src={matchedUser[0].avatarURL.src}
            wrapped
            size="large"
            ui={false}
          />

          <Card.Content className="QuestionContent">
            <Card.Meta>
              <span className="date">{question.author} asks</span>
            </Card.Meta>
            <Card.Header>Would you rather</Card.Header>

            <Card.Description>
              <div className="text">{question.optionOne.text.trim()} &nbsp;or &nbsp; ...</div>
              
              <Link
                to={`/questions/${question.id}`}
                state={{ state:props.unanswered}}
                style={{ display: "block" }}
              >
                {props.unanswered ? (
                  <Button positive>Answer poll</Button>
                ) : (
                  <Button positive>View Poll</Button>
                )}
              </Link>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <span>
              <Icon name="user" />
              {Object.keys(question.optionOne.votes).length +
                Object.keys(question.optionTwo.votes).length}
              &nbsp; votes
            </span>
          </Card.Content>
        </Card>
      </div>
    )
  );
};
