import IMatches from '../interfaces/IMatches';

const returnTotalVictoriesAway = (teamName: string, matches: Array<IMatches>): number => {
  let totalVictories: number = 0;

  matches.forEach(item => {
    if (item.teamAway.teamName === teamName && item.inProgress === false) {
      if(item.awayTeamGoals > item.homeTeamGoals) totalVictories += 1;
    }
  });

  return totalVictories;
}

const returnTotalLossesAway = (teamName: string, matches: Array<IMatches>): number => {
  let totalLosses: number = 0;

  matches.forEach(item => {
    if (item.teamAway.teamName === teamName && item.inProgress === false) {
      if(item.awayTeamGoals < item.homeTeamGoals) totalLosses += 1;
    }
  });

  return totalLosses;
}

const returnTotalGamesAway = (teamName: string, matches: Array<IMatches>): number => {
  let totalGames: number = 0;

  matches.forEach(item => {
    if (item.teamAway.teamName === teamName && item.inProgress === false) {
      totalGames += 1;
    }
  });

  return totalGames;
}

const returnTotalDrawsAway = (teamName: string, matches: Array<IMatches>): number => {
  let totalDraws: number = 0;

  matches.forEach(item => {
    if (item.teamAway.teamName === teamName && item.inProgress === false) {
      if(item.awayTeamGoals === item.homeTeamGoals) totalDraws += 1;
    }
  });

  return totalDraws;
}

export { returnTotalVictoriesAway, returnTotalLossesAway, returnTotalDrawsAway, returnTotalGamesAway };