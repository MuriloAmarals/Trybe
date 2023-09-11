import IMatches from '../interfaces/IMatches';

const returnPoints = (teamName: string, matches: Array<IMatches>): number => {
  let points: number = 0;

  matches.forEach(item => {
    if (item.teamHome.teamName === teamName && item.inProgress === false) {
      if (item.homeTeamGoals > item.awayTeamGoals) {
        points += 3;
      }

      if (item.homeTeamGoals === item.awayTeamGoals) {
        points += 1;
      }
    }
  });

  return points;
}

const returnPointsAway = (teamName: string, matches: Array<IMatches>): number => {
  let points: number = 0;

  matches.forEach(item => {
    if (item.teamAway.teamName === teamName && item.inProgress === false) {
      if (item.awayTeamGoals > item.homeTeamGoals) {
        points += 3;
      }

      if (item.homeTeamGoals === item.awayTeamGoals) {
        points += 1;
      }
    }
  });

  return points;
}

export { returnPoints, returnPointsAway }; 