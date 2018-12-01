import models from '../models';

const { Record } = models;

class Records {
  static createRecord(req, res) {
    const {
      name, type, images, videos, geolocation,
    } = req.body;

    const create = Record.create({
      name,
      type,
      images,
      videos,
      geolocation,
    });

    if (Object.keys(create).length < 1) {
      return res.status(500).json({
        status: 500,
        error: 'Unexpected server error occured.',
      });
    }

    return res.status(201).json({
      status: 201,
      data: [create],
    });
  }
}

export default Records;
