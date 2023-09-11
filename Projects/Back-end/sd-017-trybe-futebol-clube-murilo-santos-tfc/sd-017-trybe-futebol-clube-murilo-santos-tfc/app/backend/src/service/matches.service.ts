import MatchModel from '../model/matches.model';

export default class MatchService {
  public matchModel: MatchModel;

  constructor () {
    this.matchModel = new MatchModel();
  }

  public saveMatch = async (homeTeam: number, awayTeam: number, homeTeamGoals: number, awayTeamGoals: number) => {
    const match = await this.matchModel.saveMatch(homeTeam, awayTeam, homeTeamGoals, awayTeamGoals);

    return match;
  }

  public editMatch = async (id: string, homeTeamGoals: string, awayTeamGoals: string) => {
    await this.matchModel.editMatch(id, homeTeamGoals, awayTeamGoals);
  }

  public getAllMatches = async () => {
    const matches = await this.matchModel.getAllMatches();

    return matches;
  }

  public finishMatch = async (id: string) => {
    await this.matchModel.finishMatch(id);
  }
}