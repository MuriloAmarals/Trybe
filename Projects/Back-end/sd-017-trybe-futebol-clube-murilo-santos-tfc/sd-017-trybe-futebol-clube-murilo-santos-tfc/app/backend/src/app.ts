import * as express from 'express';
import LoginController from './controller/login.controller';
import ValidateUser from './middlewares/validateUser';
import TeamsController from './controller/teams.controller';
import MatchController from './controller/matches.controller';
import teamsMatchValidate from './middlewares/validateTeamsMatch';
import tokenValidate from './middlewares/validateToken';
import LeaderboardController from './controller/leaderboard.controller';

class App {
  public app: express.Express;
  loginController: LoginController;
  validateUser: ValidateUser;
  teamsController: TeamsController;
  matchController: MatchController;
  leaderboardController: LeaderboardController;

  constructor() {
    this.app = express();
    this.loginController = new LoginController();
    this.validateUser = new ValidateUser();
    this.teamsController = new TeamsController();
    this.matchController = new MatchController();
    this.leaderboardController = new LeaderboardController();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.post('/login', this.validateUser.email, this.validateUser.password, this.loginController.login);
    this.app.get('/login/validate', this.loginController.loginValidate);
    this.app.get('/teams', this.teamsController.getAllTeams);
    this.app.get('/teams/:id', this.teamsController.getTeamById);
    this.app.get('/matches', this.matchController.getAllMatches);
    this.app.post('/matches', tokenValidate, teamsMatchValidate, this.matchController.saveMatch);
    this.app.patch('/matches/:id/finish', this.matchController.finishMatch);
    this.app.patch('/matches/:id', this.matchController.editMatch);
    this.app.get('/leaderboard/home', this.leaderboardController.homeLeaderboard);
    this.app.get('/leaderboard/away', this.leaderboardController.awayLeaderboard);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };
    this.app.use(express.json());
    this.app.use(accessControl);
  }
  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}
export { App };
// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();