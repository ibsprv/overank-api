export interface IUser {
  name: string;
  givenName: string;
  dNummer: string;
  location: string;
  email: string;
}

export interface ILdapUser {
  cn: string;
  title: string;
  l: string;
  sn: string;
  givenName: string;
  displayName: string;
  sAMAccountName: string;
  mail: string;
}
