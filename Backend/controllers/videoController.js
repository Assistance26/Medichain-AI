const generateVideoToken = require("../utils/generateToken");

exports.getToken = (req, res) => {
  const { identity, room } = req.body;

  if (!identity || !room) {
    return res.status(400).json({ error: "Identity and Room Name are required!" });
  }

  try {
    const token = generateVideoToken(identity, room);
    res.json({ token });
  } catch (error) {
    console.error("Error generating token:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
