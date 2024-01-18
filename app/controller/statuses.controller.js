import dbPool from "../lib/dbConnect.js";

export const getStatus = async (req, res, next) => {
  try {
    const statuses = await dbPool.query("SELECT * FROM Statuses");

    res.json({
      status: 200,
      data: statuses[0],
    });
  } catch (error) {
    next(error);
  }
};

export const createStatus = async (req, res, next) => {
  try {
    const { status_id, status_name } = req.body;

    const [createdStatus] = await dbPool.query("INSERT INTO Statuses (status_id, status_name) VALUES (?, ?)", [status_id, status_name]);

    res.status(201).json({
      status: 201,
      data: createdStatus,
    });
  } catch (error) {
    next(error);
  }
};

export const updateStatus = async (req, res, next) => {
  try {
    const statusId = req.params.id;
    const { StatusName } = req.body;

    const [existingStatus] = await dbPool.query("SELECT * FROM Statuses WHERE status_id = ?", [statusId]);

    if (existingStatus.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "Status not found",
      });
    }

    await dbPool.query("UPDATE Statuses SET StatusName = ? WHERE status_id = ?", [StatusName, statusId]);

    res.json({
      status: 200,
      message: "Status updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteStatus = async (req, res, next) => {
  try {
    const statusId = req.params.id;

    const [existingStatus] = await dbPool.query("SELECT * FROM Statuses WHERE status_id = ?", [statusId]);

    if (existingStatus.length === 0) {
      return res.status(404).json({
        status: 404,
        message: ["Status not found", statusId],
      });
    }

    await dbPool.query("DELETE FROM Statuses WHERE status_id = ?", [statusId]);

    res.json({
      status: 200,
      message: "Status deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
