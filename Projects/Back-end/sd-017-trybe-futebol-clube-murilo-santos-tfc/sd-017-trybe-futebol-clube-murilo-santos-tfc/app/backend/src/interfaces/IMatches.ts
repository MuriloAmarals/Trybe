export default interface IMatches {
    homeTeam: number,
    homeTeamGoals: number,
    awayTeam: number,
    awayTeamGoals: number,
    id: number,
    inProgress: boolean,
    teamHome: { teamName: string},
    teamAway: { teamName: string },
  }