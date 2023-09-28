const {
  create,
  findByEmail,
  findAll,
} = require("../../services/pre_registration.service");

const {
  getAllKnocker,
  findKnockerById,
  updateUser,
} = require("../../services/users.service");
const { getOffset } = require("../../utils/helpers/helper");

exports.preRegistration = async (req, res, next) => {
  try {
    // const { currentUser } = req;
    const { email } = req.body;
    // if (currentUser.roles.some((role) => role.name != "Knocker")) {
    //   return res.status(400).json({ message: "User is Not a Knocker" });
    // }
    if (!email) {
      return res.status(400).json({ message: "Invalid email" });
    }
    const exist = await findByEmail(email);
    if (exist) {
      return res
        .status(400)
        .json({ message: "Already exist with the provided email" });
    }
    const data = {
      email,
      // status: "PRE-REGISTRATION-PENDING",
    };
    const result = await create(data);
    if (result) {
      return res
        .status(200)
        .json({ message: "Requested for Pre-Registration" });
    }
    return res.status(400).json({ message: "Error while requesting" });
  } catch (error) {
    next(error);
  }
};

exports.findAllPreRegistration = async (req, res, next) => {
  try {
    const { currentUser } = req;
    // if (currentUser.roles.some((role) => role.name != "Admin")) {
    //   return res.status(400).json({ message: "User is Not Admin" });
    // }
    let { page = 1, limit = 10 } = req.query;
    limit = +limit;
    page = +page;
    const offset = getOffset({ limit, page });
    const exist = await findAll(limit, offset);
    if (exist) {
      return res.status(200).json({
        total: exist.count,
        limit,
        currentPage: page,
        data: exist.rows,
      });
    }
    return res.status(400).json({ message: "Not Found" });
  } catch (error) {
    next(error);
  }
};

exports.getAllKnockers = async (req, res, next) => {
  try {
    console.log("fetching all knockers");
    const { currentUser } = req;
    let { page = 1, limit = 10 } = req.query;
    limit = +limit;
    page = +page;
    const offset = getOffset({ limit, page });
    // if (currentUser.roles.some((role) => role.name != "Admin")) {
    //   return res.status(400).json({ message: "User is Not Admin" });
    // }
    const result = await getAllKnocker(limit, offset);
    if (result) {
      return res.status(200).json({
        total: result.count,
        limit,
        currentPage: page,
        data: result.rows,
      });
    }
    return res.status(400).json({ message: "Error while fetching Knockers" });
  } catch (error) {
    next(error);
  }
};

exports.getKnockerById = async (req, res, next) => {
  try {
    console.log("fetching all knockers");
    const { currentUser } = req;
    // if (currentUser.roles.some((role) => role.name != "Admin")) {
    //   return res.status(400).json({ message: "User is Not Admin" });
    // }
    const { id } = req.query;
    if (!id || id === 0) {
      return res.status(400).json({ message: "Invalid Id" });
    }
    const result = await findKnockerById(id);
    if (result) {
      return res.status(200).json(result);
    }
    return res.status(400).json({ message: "Error while fetching Knocker" });
  } catch (error) {
    next(error);
  }
};

exports.updateKnocker = async (req, res, next) => {
  try {
    console.log("updating knocker");
    // const { currentUser } = req;
    // if (currentUser.roles.some((role) => role.name != "Admin")) {
    //   return res.status(400).json({ message: "User is Not Admin" });
    // }
    const { id } = req.query;
    const {
      userName,
      firstName,
      lastName,
      email,
      password,
      enable,
      deleted,
      phone,
      status,
    } = req.body;
    if (!id || id === 0) {
      return res.status(404).json({ message: "Invalid UserId" });
    }
    const user = await findKnockerById(id);

    console.log("kncoker: ", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const result = await updateUser(
      {
        userName,
        firstName,
        lastName,
        email,
        password,
        enable,
        deleted,
        phone,
        status,
      },
      user.id
    );
    if (result[0] === 1) {
      return res.status(200).json({ message: "Knocker Updated" });
    }
    return res.status(400).json({ message: "Error while updating user" });
  } catch (error) {
    next(error);
  }
};
