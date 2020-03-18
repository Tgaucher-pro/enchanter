const users = [];

const addUser = ({ id, name, game }) => {
  name = name.trim().toLowerCase();
  game = game.trim().toLowerCase();

  const existingUser = users.find(
    user => user.game === game && user.name === name
  );

  if (existingUser) {
    return { error: "Username is taken" };
  }

  const user = { id, name, game };
  users.push(user);

  return { user };
};

const removeUser = id => {
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = id => users.find(user => user.id === id);

const getUsersInGame = game => users.filter(user => user.game === game);

module.exports = { addUser, removeUser, getUser, getUsersInGame };
