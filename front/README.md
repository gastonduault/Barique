## CMD ionic
créer un projet 
```bash
ionic start front  blank --type=vue --capacitor
```

lancer le projet (web) 
```bash
ionic serve
```

Init capacitor and build project<br />
`ionic build`

ajouter android / ios <br />
`ionic cap add android`
`ionic cap add android`

lancer le projet (android / ios) <br />
`ionic cap open android`
`ionic cap open ios`

Refresh android / ios <br />
`ionic cap sync`

Pour debuger sur android  (avec chrome) : <br />
`chrome://inspect/#devices`

keystore SHA for google auth on android <br />
`keytool -list -v -alias androiddebugkey -keystore C:\Users\gasdu\.android\debug.keystore`