import LeaderboardModel from '../model/leaderboard.model';

export default class LeaderboardService {
  public leaderboardModel: LeaderboardModel;

  constructor () {
    this.leaderboardModel = new LeaderboardModel();
  }

  public awayLeaderboard = async () => {
    const leaderboardResponse = await this.leaderboardModel.awayLeaderboard();

    return leaderboardResponse;
  };

  public homeLeaderboard = async () => {
    const leaderboardResponse = await this.leaderboardModel.homeLeaderboard();

    return leaderboardResponse;
  };
}