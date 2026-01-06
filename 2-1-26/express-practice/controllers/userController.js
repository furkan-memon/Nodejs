const users = [
  { id: 1, name: "Furkan" },
  { id: 2, name: "Ali" },
  { id: 3, name: "Sara" },
];

exports.getAllUsers = (req, res) => {
  res.json(users);
};

exports.getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
   if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user);
};