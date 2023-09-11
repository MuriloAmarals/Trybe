import { Request, Response } from 'express';
import TeamsService from '../service/teams.service';

export default class TeamsController {
  public teamsService: TeamsService;

  constructor () {
    this.teamsService = new TeamsService();
  }

  public getTeamById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const team = await this.teamsService.getTeamById(id);

    return res.status(200).json(team);
}

public getAllTeams = async (_req: Request, res: Response): Promise<Response> => {
  const teams = await this.teamsService.getAllteams();

  return res.status(200).json(teams);
}
}