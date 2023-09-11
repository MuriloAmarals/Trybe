import IMatches from '../interfaces/IMatches';

const returnTotalVictories = (teamName: string, matches: Array<IMatches>): number => {
  let totalVictories: number = 0;

  matches.forEach(item => {
    if (item.teamHome.teamName === teamName && item.inProgress === false) {
      if(item.homeTeamGoals > item.awayTeamGoals) totalVictories += 1;
    }
  });

  return totalVictories;
}

const returnTotalLosses = (teamName: string, matches: Array<IMatches>): number => {
  let totalLosses: number = 0;

  matches.forEach(item => {
    if (item.teamHome.teamName === teamName && item.inProgress === false) {
      if(item.homeTeamGoals < item.awayTeamGoals) totalLosses += 1;
    }
  });

  return totalLosses;
}

const returnTotalGames = (teamName: string, matches: Array<IMatches>): number => {
  let totalGames: number = 0;

  matches.forEach(item => {
    if (item.teamHome.teamName === teamName && item.inProgress === false) {
      totalGames += 1;
    }
  });

  return totalGames;
}

const returnTotalDraws = (teamName: string, matches: Array<IMatches>): number => {
  let totalDraws: number = 0;

  matches.forEach(item => {
    if (item.teamHome.teamName === teamName && item.inProgress === false) {
      if(item.homeTeamGoals === item.awayTeamGoals) totalDraws += 1;
    }
  });

  return totalDraws;
}

export {  returnTotalVictories, returnTotalLosses, returnTotalGames, returnTotalDraws };