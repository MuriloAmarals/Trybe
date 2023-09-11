import IMatches from '../interfaces/IMatches';

const returnFavorGoals = (teamName: string, matches: Array<IMatches>): number => {
  let favorGoals: number = 0;

  matches.forEach(item => {
    if (item.teamHome.teamName === teamName && item.inProgress === false) {
      favorGoals += item.homeTeamGoals;
    }
  });

  return favorGoals;
}

const returnFavorGoalsAway = (teamName: string, matches: Array<IMatches>): number => {
  let favorGoals: number = 0;

  matches.forEach(item => {
    if (item.teamAway.teamName === teamName && item.inProgress === false) {
      favorGoals += item.awayTeamGoals;
    }
  });

  return favorGoals;
}

const returnOwnGoals = (teamName: string, matches: Array<IMatches>): number => {
  let ownGoals: number = 0;

  matches.forEach(item => {
    if (item.teamHome.teamName === teamName && item.inProgress === false) {
      ownGoals += item.awayTeamGoals;
    }
  });

  return ownGoals;
}

const returnOwnGoalsAway = (teamName: string, matches: Array<IMatches>): number => {
  let ownGoals: number = 0;

  matches.forEach(item => {
    if (item.teamAway.teamName === teamName && item.inProgress === false) {
      ownGoals += item.homeTeamGoals;
    }
  });

  return ownGoals;
}

export { returnFavorGoals, returnFavorGoalsAway, returnOwnGoals ,returnOwnGoalsAway }; 