import Lead from "../models/Lead.js";

// CREATE LEAD

export const createLead = async (req, res) => {

  try {

    const lead = await Lead.create(req.body);

    res.status(201).json(lead);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

// GET LEADS

export const getLeads = async (req, res) => {

  try {

    const leads = await Lead.find();

    res.json(leads);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE LEAD

export const updateLead = async (req, res) => {

  try {

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(lead);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE LEAD

export const deleteLead = async (req, res) => {

  try {

    await Lead.findByIdAndDelete(req.params.id);

    res.json({
      message: "Lead Deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};