import TeamsModel from '../model/teams.model';
import ITeam from '../interfaces/ITeams';

export default class TeamsService {
  public teamsModel: TeamsModel;

  constructor () {
    this.teamsModel = new TeamsModel();
  }

  public getTeamById = async (id: string): Promise<ITeam> => {
    const team = await this.teamsModel.getTeamById(id);

    return team;
  }

  public getAllteams = async (): Promise<ITeam[]> => {
    const teams = await this.teamsModel.getAllteams();

    return teams;
  }
}