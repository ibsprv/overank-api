const isLocal = process.env.local === "local";

export const LDAP = {
  url: isLocal ? "ldap://localhost:8389" : "ldap://10.10.110.170:389",
  bindDN:
    "CN=LDAPREADER,OU=ServiceAccounts,OU=Office365,OU=IBsolution,DC=ibsolution,DC=local",
  password: process.env.LDAP_PASSWORD,
  searchDN:
    "OU=D-User,OU=User,OU=Office365,OU=IBsolution,DC=ibsolution,DC=local"
};
