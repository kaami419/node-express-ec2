const {
  create,
  findAll,
  findById,
  updatePin,
} = require("../../services/pin.service");
const { getOffset } = require("../../utils/helpers/helper");

exports.createPin = async (req, res, next) => {
  try {
    console.log("creating new Pin");
    // const { currentUser } = req;
    // if (currentUser.roles.some((role) => role.name != "Admin")) {
    //   return res.status(400).json({ message: "User is Not Admin" });
    // }
    const { name, image } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Invalid Name" });
    }
    const data = {
      name,
      image,
      enable: true,
      deleted: false,
    };
    const pin = await create(data);
    if (pin) {
      return res.status(201).json({ message: "Pin Created Successfully" });
    }
    return res.status(400).json({ message: "Error while creating Pin" });
  } catch (error) {
    next(error);
  }
};

exports.findAllPins = async (req, res, next) => {
  try {
    console.log("finding all Pins");
    // const { currentUser } = req;
    // if (currentUser.roles.some((role) => role.name != "Admin")) {
    //   return res.status(400).json({ message: "User is Not Admin" });
    // }
    let { page = 1, limit = 10 } = req.query;
    limit = +limit;
    page = +page;
    const offset = getOffset({ limit, page });
    const pins = await findAll(limit, offset);
    if (pins) {
      return res.status(201).json({
        total: pins.count,
        limit,
        image:pins.rows.image,
        currentPage: page,
        data: pins.rows,
      });
    }
    return res.status(400).json({ message: "Error while creating Pin" });
  } catch (error) {
    next(error);
  }
};

exports.updatePin = async (req, res, next) => {
  try {
    console.log("updating Pin");
    // const { currentUser } = req;
    // if (currentUser.roles.some((role) => role.name != "Admin")) {
    //   return res.status(400).json({ message: "User is Not Admin" });
    // }
    const { id } = req.query;
    if (!id || id === 0) {
      return res.status(400).json({ message: "Invalid Pin Id" });
    }
    const { name, image } = req.body;
    if (!name || name === "") {
      return res.status(400).json({ message: "Invalid Pin Name" });
    }
    const pin = await findById(id);
    if (!pin) {
      return res.status(400).json({ message: "Pin Not Found" });
    }
    const result = await updatePin(id, { name, image });
    if (result[0] === 1) {
      return res.status(200).json({ message: "Pin Updated" });
    }
    return res.status(400).json({ message: "Error while updating Pin" });
  } catch (error) {
    next(error);
  }
};

exports.deletePin = async (req, res, next) => {
  try {
    console.log("deleting  Pin");
    // const { currentUser } = req;
    // if (currentUser.roles.some((role) => role.name != "Admin")) {
    //   return res.status(400).json({ message: "User is Not Admin" });
    // }
    const { id } = req.query;
    if (!id || id === 0) {
      return res.status(400).json({ message: "Invalid Pin Id" });
    }
    const pin = await findById(id);
    if (!pin) {
      return res.status(400).json({ message: "Pin Not Found" });
    }
    const result = await updatePin(id, { deleted: true, enable: false });
    if (result[0] === 1) {
      return res.status(200).json({ message: "Pin Deleted" });
    }
    return res.status(400).json({ message: "Error while updating Pin" });
  } catch (error) {
    next(error);
  }
};
