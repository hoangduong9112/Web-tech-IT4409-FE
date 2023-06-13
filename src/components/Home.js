import React, { Component } from 'react';
import withAuthorization from './withAuthorization';
import { db } from '../firebase';
import { Link } from 'react-router-dom';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      boardName: '',
      boards: []
    };

    this.createBoard = this.createBoard.bind(this);
  }

  componentDidMount() {
    db.onceGetBoards().then(snapshot => {
      if (!snapshot.val()) {
        return;
      }
      this.setState({
        boards: getBoardsWithKey(snapshot.val())
      });
    });
  }

  createBoard() {
    if (!this.state.boardName) {
      return;
    }
    db.doAddBoard({
      title: this.state.boardName
    }).then(
      db.onceGetBoards().then(snapshot =>
        this.setState({
          boards: getBoardsWithKey(snapshot.val())
        })
      )
    );
  }

  render() {
    const { boards } = this.state;

    return (
      <div>
        <h1>Home</h1>
        <input
          onChange={event => this.setState({ boardName: event.target.value })}
          value={this.state.boardName}
        />
        <button onClick={this.createBoard}>Create board</button>
        <BoardList boards={boards} />
      </div>
    );
  }
}

const getBoardsWithKey = value => {
  return Object.values(value).map((val, index) => {
    return {
      title: val.title,
      key: Object.keys(value)[index].replace('-', '')
    };
  });
};

const BoardList = ({ boards }) => (
  <div>
    List of boardes
    {boards.map((board, index) => (
      <div key={index}>
        <Link to={`b/${board.key}`}>{board.title}</Link>
      </div>
    ))}
  </div>
);

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(HomePage);
