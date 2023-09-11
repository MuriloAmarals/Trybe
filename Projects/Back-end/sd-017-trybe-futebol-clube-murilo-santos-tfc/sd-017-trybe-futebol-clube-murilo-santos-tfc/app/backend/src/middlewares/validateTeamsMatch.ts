import { NextFunction, Request, Response } from 'express';
import Match from '../database/models/Match';

const teamsMatchValidate = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
  const { homeTeam, awayTeam } = req.body;

  if (homeTeam === awayTeam) {
    return res.status(401).json({
      message: 'It is not possible to create a match with two equal teams',
    });
  }

  const awayTeamExist = await Match.findOne({ where: { awayTeam } });

  const homeTeamExist = await Match.findOne({ where: { homeTeam } });

  if (!homeTeamExist || !awayTeamExist) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }

  next();
};

export default teamsMatchValidate;