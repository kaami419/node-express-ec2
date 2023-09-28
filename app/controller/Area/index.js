const {
  create,
  findAll,
  findAreaById,
  findAllAreaById,
} = require("../../services/area.service");
const {
  findKnockerById,
  findKnockersAreasById,
} = require("../../services/users.service");
const { getOffset } = require("../../utils/helpers/helper");

exports.create = async (req, res, next) => {
  try {
    console.log("creating new area");
    // const { currentUser } = req;
    // if (currentUser.roles.some((role) => role.name != "Admin")) {
    //   return res.status(400).json({ message: "User is Not Admin" });
    // }
    const { name, path } = req.body;
    if (!name || !path || path.length === 0) {
      return res.status(400).json({ message: "Invalid Parameters" });
    }
    console.log("valid params");
    const pathString = path.map((coord) => coord.join(", ")).join(" | ");
    const data = {
      name,
      path: pathString,
    };
    const result = await create(data);
    if (result) {
      return res.status(201).json({ message: "Area Created!" });
    }
    return res.status(400).json({ message: "Error while creating area" });
  } catch (error) {
    next(error);
  }
};

exports.finAllAreas = async (req, res, next) => {
  try {
    console.log("getting all areas");
    // const { currentUser } = req;
    // if (currentUser.roles.some((role) => role.name != "Admin")) {
    //   return res.status(400).json({ message: "User is Not Admin" });
    // }
    let { page = 1, limit = 10 } = req.query;
    limit = +limit;
    page = +page;
    const offset = getOffset({ limit, page });
    const result = await findAll({ limit, offset });
    if (result.rows.length > 0) {
      for (data of result.rows) {
        const coordinateStrings = data.path.split(" | ");
        data.path = coordinateStrings.map((coordString) =>
          coordString.split(", ").map(Number)
        );
      }
    }
    if (result) {
      return res.status(200).json({
        total: result.count,
        limit,
        currentPage: page,
        data: result.rows,
      });
    }
    return res.status(400).json({ message: "Error while fetching area" });
  } catch (error) {
    next(error);
  }
};

exports.AssignAreaToKnocker = async (req, res, next) => {
  try {
    console.log("assigning area to knocker");
    // const { currentUser } = req;
    const { areaId, knockerId } = req.body;
    // if (currentUser.roles.some((role) => role.name != "Admin")) {
    //   return res.status(400).json({ message: "User is Not Admin" });
    // }
    if (!areaId || areaId === 0 || !knockerId || knockerId === 0) {
      return res.status(400).json({ message: "Invalid Parametets" });
    }
    const area = await findAreaById(areaId);
    if (!area) {
      return res.status(400).json({ message: "Area not found" });
    }
    const knocker = await findKnockerById(knockerId);
    if (!knocker) {
      return res.status(400).json({ message: "Knocker not found" });
    }
    const result = await knocker.addArea(area.id);
    if (result) {
      return res.status(201).json({ message: "Area Assigned to Knocker" });
    }
    return res
      .staus(400)
      .json({ message: "Error while assigning area to knocker" });
  } catch (error) {
    next(error);
  }
};

exports.FetchAllAreaUsers = async (req, res, next) => {
  try {
    console.log("assigning area to knocker");
    // const { currentUser } = req;
    const { areaId, knockerId } = req.query;
    // if (currentUser.roles.some((role) => role.name != "Admin")) {
    //   return res.status(400).json({ message: "User is Not Admin" });
    // }
    console.log(areaId, knockerId);
    if ((!areaId || areaId === 0) && (!knockerId || knockerId === 0)) {
      return res.status(400).json({ message: "Invalid Parameters" });
    }
    if (areaId) {
      console.log("finding areas users");
      const area = await findAllAreaById(areaId);
      if (!area) {
        return res.status(400).json({ message: "Area not found" });
      }
      return res.status(200).json({ area });
    } else if (knockerId) {
      console.log("finding users areas");
      const knocker = await findKnockersAreasById(knockerId);
      return res.status(200).json({ knocker });
    }
    return res
      .staus(400)
      .json({ message: "Error while assigning area to knocker" });
  } catch (error) {
    next(error);
  }
};
