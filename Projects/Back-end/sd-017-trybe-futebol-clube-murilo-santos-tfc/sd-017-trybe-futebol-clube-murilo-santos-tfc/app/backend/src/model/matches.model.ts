import Match from '../database/models/Match';
import Team from '../database/models/Team';
import ITeam from '../interfaces/ITeams';

export default class MatchModel {

  public finishMatch = async (id: string) => {
    await Match.update({  inProgress: false }, { where: { id } });
  }

  public editMatch = async (id: string, homeTeamGoals: string, awayTeamGoals: string) => {
    await Match.update({
      homeTeamGoals,
      awayTeamGoals,
    }, { where: { id } });
  }

  public saveMatch = async (homeTeam: number, awayTeam: number, homeTeamGoals: number, awayTeamGoals: number) => {
    const match = await Match.create({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true });

    return match;
  }

  public getAllMatches = async () => {
    const matches = await Match.findAll();

    const matchList = Promise.all(matches.map(async (item) => {
      const teamAway = await Team.findOne({ where: { id: item.awayTeam } }) as ITeam;
      const teamHome = await Team.findOne({ where: { id: item.homeTeam } }) as ITeam;

      return { 'id': item.id,
        'homeTeam': item.homeTeam,
        'homeTeamGoals': item.homeTeamGoals,
        'awayTeam': item.awayTeam,
        'awayTeamGoals': item.awayTeamGoals,
        'inProgress': item.inProgress,
        'teamHome': { 'teamName': teamHome.teamName },
        'teamAway': { 'teamName': teamAway.teamName }
      }
    }));

    return matchList;
  }
} 