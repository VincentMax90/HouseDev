const userService = require("../services/user.service");

exports.registerUser = async (req, res) => {
  try {
    const { name, lastname, email, password, admin } = req.body;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Correo electrónico inválido" });
    }
    const user = await userService.registerUser(
      name,
      lastname,
      email,
      password,
      admin
    );
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userService.findUserByEmail(email);
    if (!user) {
      return res.sendStatus(401);
    }

    const isValid = await userService.validateUserPassword(
      password,
      user.password
    );
    if (!isValid) {
      return res.sendStatus(401);
    }

    const payload = {
      email: user.email,
      name: user.name,
      lastname: user.lastname,
      phone: user.phone,
      img_url: user.img_url,
      id: user.id,
      admin: user.admin,
    };
    const token = userService.generateToken(payload);

    res.cookie("token", token);

    res.send(payload);
  } catch (error) {
    console.error("Error during login:", error);
    res.sendStatus(500);
  }
};

exports.getAuthenticatedUser = async (req, res) => {
  try {
    res.send(req.user);
  } catch (error) {
    console.error("Error during getting authenticated user:", error);
    res.sendStatus(500);
  }
};

exports.logout = (req, res) => {
  try {
    res.clearCookie("token");
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ error: "Logout failed" });
  }
};

exports.getUserProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const userProfile = await userService.getUserProfile(id);
    if (!userProfile) {
      return res
        .status(404)
        .json({ message: "Perfil de usuario no encontrado" });
    }
    res.json(userProfile);
  } catch (error) {
    console.error("Error al obtener el perfil de usuario:", error);
    res.status(500).json({ message: "Error al obtener el perfil de usuario" });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const profileData = req.body;

    if (profileData.img_url) {
      await userService.updateUserImage(id, profileData.img_url);
    }

    const updatedProfile = await userService.updateUserProfile(id, profileData);
    res.json(updatedProfile);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Ha ocurrido un error al actualizar el perfil" });
  }
};
