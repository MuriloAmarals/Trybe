import MatchService from '../service/matches.service';
import { Request, Response } from 'express';

export default class MatchController {
  public matchService: MatchService;

  constructor () {
    this.matchService = new MatchService();
  }

  public editMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    await this.matchService.editMatch(id, homeTeamGoals, awayTeamGoals);

    return res.status(200).json({ message: 'Partida atualizada' });
  }

  public getAllMatches = async (_req: Request, res: Response): Promise<Response> => {
    const matches = await this.matchService.getAllMatches();

    return res.status(200).json(matches);
  }

  public finishMatch = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    await this.matchService.finishMatch(id);

    return res.status(200).json({ message: "Finished" });
  }

  public saveMatch = async (req: Request, res: Response): Promise<Response> => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;

    const match = await this.matchService.saveMatch(homeTeam, awayTeam, homeTeamGoals, awayTeamGoals);

    return res.status(201).json(match);
  }
}