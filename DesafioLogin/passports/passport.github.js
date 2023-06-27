import passport from "passport";
import UsersDao from "../daos/user.daos.js";
import { Strategy as GithubStrategy } from "passport-github2";

const userDao = new UsersDao();
 
const strategyOptions = {
  clientID: "Iv1.7d53ce4dba08ecce",
  clientSecret: "d4fe246c85c69ef5f8a7bb58b2382e9c929f3e91",
  callbackURL: "http://localhost:8080/users/profile-github",
};

const registerOrLogin = async(accessToken, refreshToken, profile, done) =>{
  console.log('profile:::', profile);
  const email = profile._json.email !== null ? profile._json.email : profile._json.blog;
  const user = await userDao.getByEmail(email);
  if(user) return done(null, user);
  const newUser = await userDao.createUser({
      first_name: profile._json.name.split(' ')[0],
      last_name: profile._json.name.split(' ')[1] + ' ' + profile._json.name.split(' ')[2],
      email,
      password: ' ',
      isGithub: true
  });
  return done(null, newUser);
}

passport.use('github', new GithubStrategy(strategyOptions, registerOrLogin));