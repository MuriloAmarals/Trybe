import Team from '../database/models/Team';
import ITeam from '../interfaces/ITeams';

export default class TeamsModel {

  public getTeamById = async (id: string): Promise<ITeam>  => {
    const team = await Team.findOne({ where: { id } });

    return team as ITeam;
  }

  public getAllteams = async (): Promise<ITeam[]>  => {
    const teams = await Team.findAll();

    return teams;
  }
} 