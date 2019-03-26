import { isEmpty, head, map, toUpper } from "lodash";
import { ILdapUser, IUser } from "../models";
import { LDAP } from "../config";
import { Client } from "ldapts";

export class User {
  public static mapLdapToUsers(ldapUser: ILdapUser[]): IUser[] {
    return map(ldapUser, User.mapLdapToUser);
  }

  public static mapLdapToUser(ldapUser: ILdapUser): IUser | null {
    return isEmpty(ldapUser)
      ? null
      : {
          name: ldapUser.sn,
          givenName: ldapUser.givenName,
          location: ldapUser.l,
          email: ldapUser.mail,
          dNummer: ldapUser.sAMAccountName
        };
  }
  private ldapClient: Client;

  constructor() {
    this.ldapClient = new Client({
      url: LDAP.url
    });
  }

  public async findByEmail(email: string): Promise<IUser> {
    try {
      return this.findByAttr("mail", email);
    } catch (err) {
      throw new Error(err);
    }
  }

  public async findByDNummer(dNummer: string): Promise<IUser> {
    try {
      return this.findByAttr("sAMAccountName", toUpper(dNummer));
    } catch (err) {
      throw new Error(err);
    }
  }

  private async findByAttr(attr: string, dNummer: string): Promise<IUser> {
    const query = `(${attr}=${dNummer})`;
    return User.mapLdapToUser(await this.makeLdapQuery(query));
  }

  private async makeLdapQuery(query: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      let result: any = null;
      try {
        await this.ldapClient.bind(LDAP.bindDN, LDAP.password);

        const {
          searchEntries,
          searchReferences
        } = await this.ldapClient.search(LDAP.searchDN, {
          scope: "sub",
          filter: query
        });

        // debug
        // tslint:disable-next-line:no-console
        console.debug(searchEntries);

        result = head(searchEntries);
      } catch (ex) {
        reject(ex);
      } finally {
        await this.ldapClient.unbind();
      }
      resolve(result);
    });
  }
}
