## TODO of front
- auth google
  - for web✅
  - for android
  - for ios
- store cookie on device after auth
  - for web✅
  - for android 
  - for ios
- add secure encryption id key
- add store of vuex ✅
- add multi lang i18v
<br /><br />
- add 
   - take photo
   - send photo http
   - manual
- see bottle
- add cave ✅
- edit cave



## CMD ionic
créer un projet <br /> 
`ionic start front  blank --type=vue --capacitor`

lancer le projet (web) <br />
`ionic serve`

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