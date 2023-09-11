import MatchModel from './matches.model';
import { returnPoints, returnPointsAway } from '../utils/calculatePoints';
import { returnFavorGoals, returnFavorGoalsAway, returnOwnGoals, returnOwnGoalsAway } from '../utils/calculateGoals';
import { returnTotalDraws, returnTotalGames, returnTotalLosses, returnTotalVictories } from '../utils/caculateGamesHome';
import { returnTotalDrawsAway, returnTotalGamesAway, returnTotalLossesAway, returnTotalVictoriesAway } from '../utils/calculateGamesAway';

export default class LeaderboardModel {
  public matchModel: MatchModel;

  constructor () {
    this.matchModel = new MatchModel();
  }

  public awayLeaderboard = async () => {
    const matches = await this.matchModel.getAllMatches();

    const teams = [...new Set(matches.map(item => item.teamAway.teamName))]

    const leaderboardResponse = teams.map((item) => {
      const obj = {
        name: '',
        totalPoints: 0,
        totalGames: 0,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 0,
        goalsOwn: 0,
        goalsBalance: 0,
        efficiency: 0
      };

      obj.name = item;
      obj.totalPoints = returnPointsAway(item, matches);
      obj.totalGames = returnTotalGamesAway(item, matches);
      obj.totalVictories = returnTotalVictoriesAway(item, matches);
      obj.totalDraws = returnTotalDrawsAway(item, matches);
      obj.totalLosses = returnTotalLossesAway(item, matches);
      obj.goalsFavor = returnFavorGoalsAway(item, matches);
      obj.goalsOwn = returnOwnGoalsAway(item, matches);
      obj.goalsBalance = obj.goalsFavor - obj.goalsOwn;
      obj.efficiency = Number((obj.totalPoints/(obj.totalGames*3)*100).toFixed(2));

      return obj;
    });

    const newResponse = leaderboardResponse.sort((a, b) => (
      b.totalPoints - a.totalPoints
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn
    ));

    return newResponse;
  };

  public homeLeaderboard = async () => {
    const matches = await this.matchModel.getAllMatches();

    const teams = [...new Set(matches.map(item => item.teamHome.teamName))]

    const leaderboardResponse = teams.map((item) => {
      const obj = {
        name: '',
        totalPoints: 0,
        totalGames: 0,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 0,
        goalsOwn: 0,
        goalsBalance: 0,
        efficiency: 0
      };

      obj.name = item;
      obj.totalPoints = returnPoints(item, matches);
      obj.totalGames = returnTotalGames(item, matches);
      obj.totalVictories = returnTotalVictories(item, matches);
      obj.totalDraws = returnTotalDraws(item, matches);
      obj.totalLosses = returnTotalLosses(item, matches);
      obj.goalsFavor = returnFavorGoals(item, matches);
      obj.goalsOwn = returnOwnGoals(item, matches);
      obj.goalsBalance = obj.goalsFavor - obj.goalsOwn;
      obj.efficiency = Number((obj.totalPoints/(obj.totalGames*3)*100).toFixed(2));

      return obj;
    });

    const newResponse = leaderboardResponse.sort((a, b) => (
      b.totalPoints - a.totalPoints
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn
    ));

    return newResponse;
  };
}