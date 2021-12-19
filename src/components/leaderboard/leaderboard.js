import { useSelector } from "react-redux";
import { Segment, Grid, Image, Header,Divider } from "semantic-ui-react";

export const LeaderBoard = () => {
  //get users
  const allUsers = useSelector((state) => state.allUsers);

  // convert it to array and then sort the array based on total number of
  // questions answered and asked

  // here I mapped over the users and created new array of objects to be used later to render the leaderBoard
  // I used sort(a,b) method on the total count and returned b-a (to order in descending)

  const users = Object.values(allUsers)
    .map((user) => ({
      id: user.id,
      name: user.name,
      avatarURL: user.avatarURL,
      QCount: user.questions.length,
      answersCount: Object.values(user.answers).length,
      totalScore: user.questions.length + Object.values(user.answers).length,
    }))
    .sort((a, b) => b.totalScore - a.totalScore);

  return (
    <div className="LeaderBoard">
      {users.map((user, key) => (
        <Segment.Group stacked key={user.id} className={`Color${key}`}>
          <Grid columns='equal'>
          <Grid.Row >


          <Grid.Column width={2} className="LeaderPosition">
              <Segment  basic>
              <Header as="h1">{key +1}</Header>
              </Segment>
            </Grid.Column>

            <Grid.Column className="LeaderData">
              
              <Segment basic textAlign='left'>
              <Header as="h3"   >{user.name}</Header>
       
              <Header as="h4"   >Created Questions: {user.QCount}</Header>
          

              <Header as="h4"   >Answered Questions: {user.answersCount}</Header>
              </Segment>
            </Grid.Column>
            <Grid.Column width={3} className="totalScore">
              <Segment  basic>
              <Header as="h1">Total Score</Header>
              <Divider section />
              <Header as="h1">{user.totalScore}</Header>
              </Segment>
            </Grid.Column>
            <Grid.Column width={3} className="LeaderIMG">
              <Segment padded basic>
                <Image src={user.avatarURL.src} size="small" circular />

              </Segment>
            </Grid.Column>
          </Grid.Row>
          </Grid>
        </Segment.Group>
      ))}
    </div>
  );
};
