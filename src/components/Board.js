import React, { Component } from 'react';
import { db } from '../firebase';
import withAuthorization from './withAuthorization';

class BoardPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      boardTitle: '',
      boardId: '',
      listName: '',
      isLoading: false,
      lists: []
    };

    this.createList = this.createList.bind(this);
  }

  componentDidMount() {
    this.setState({
      isLoading: true
    });
    let boardId = window.location.href
      .split('/')
      .pop()
      .replace('-', '');
    console.log(boardId);
    db.onceGetBoard(boardId)
      .then(snapshot => {
        let snapshotVal = snapshot.val();
        if (!snapshotVal) {
          return;
        }
        const listsKeys = !snapshotVal.lists || Object.keys(snapshotVal.lists);
        this.setState({
          boardId,
          boardTitle: snapshotVal.title,
          lists: snapshotVal.lists
            ? Object.values(snapshotVal.lists).map(
                (list, index) => {
                  return { key: listsKeys[index].replace('-', ''), list: list };
                },
                () => console.log(this.state)
              )
            : []
        });
      })
      .finally(() =>
        this.setState({
          isLoading: false
        })
      );
  }

  createList() {
    if (!this.state.listName) {
      return;
    }
    console.log(this.state.boardId);
    db.doAddList(this.state.boardId, { title: this.state.listName })
      .then(() => db.onceGetBoard(this.state.boardId))
      .then(snapshot => {
        let snapshotVal = snapshot.val();
        console.log(snapshotVal);
        if (!snapshotVal) {
          return;
        }
        const listsKeys = !snapshotVal.lists || Object.keys(snapshotVal.lists);
        this.setState({
          lists: snapshotVal.lists
            ? Object.values(snapshotVal.lists).map(
                (list, index) => {
                  return { key: listsKeys[index].replace('-', ''), list: list };
                },
                () => console.log(this.state)
              )
            : []
        });
      });
  }

  render() {
    let { lists, boardTitle, boardId } = this.state;
    return this.state.isLoading ? (
      <div>Loading...</div>
    ) : (
      <div>
        <BoardTitle title={boardTitle} />
        <input
          onChange={event => this.setState({ listName: event.target.value })}
          value={this.state.listName}
        />
        <button onClick={this.createList}>Create list</button>
        <br />
        <ListItems boardId={boardId} lists={lists} />
      </div>
    );
  }
}

class ListItems extends Component {
  constructor(props) {
    super(props);

    this.addCart = this.addCart.bind(this);
  }

  addCart(listKey, cartName) {
    if (!cartName) {
      return;
    }
    const { boardId } = this.props;
    db.doAddCart(boardId, listKey, { title: cartName });
  }

  render() {
    const { lists } = this.props;
    return lists.map((list, index) => {
      return (
        <div key={index}>
          <ListItem list={list} index={index} onClick={this.addCart} />
        </div>
      );
    });
  }
}

class ListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cartName: ''
    };
  }

  render() {
    const { list, index, onClick } = this.props;
    const { cartName } = this.state;
    return (
      <div className="list" key={index}>
        <b>{list.list.title}</b>
        <input
          onChange={event => this.setState({ cartName: event.target.value })}
          value={this.state.cartName}
        />
        <button onClick={e => onClick(list.key, cartName)}>Add cart</button>
      </div>
    );
  }
}

const BoardTitle = ({ title }) => <h1>{title}</h1>;

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(BoardPage);
