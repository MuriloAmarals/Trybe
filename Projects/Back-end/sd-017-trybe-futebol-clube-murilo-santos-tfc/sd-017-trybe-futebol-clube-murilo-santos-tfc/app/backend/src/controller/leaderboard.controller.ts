import { Request, Response } from 'express';
import LeaderboardService from '../service/leaderboard.service';

export default class LeaderboardController {
  public leaderboardService: LeaderboardService;

  constructor() {
    this.leaderboardService = new LeaderboardService();
  }

  public awayLeaderboard = async (_req: Request, res: Response): Promise<Response> => {
    const leaderboardResponse = await this.leaderboardService.awayLeaderboard();
    return res.status(200).json(leaderboardResponse);
  };

  public homeLeaderboard = async (_req: Request, res: Response): Promise<Response> => {
    const leaderboardResponse = await this.leaderboardService.homeLeaderboard();
    return res.status(200).json(leaderboardResponse);
  };
}