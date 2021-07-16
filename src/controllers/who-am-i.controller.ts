import {authenticate} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {get} from '@loopback/rest';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';

export class WhoAmIController {
  constructor(@inject(SecurityBindings.USER) private user: UserProfile) {}

  @authenticate('jwt')
  @get('/whoami')
  whoAmI(): string {
    return this.user[securityId];
  }
}
