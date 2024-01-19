# section-9-1-pinia-music-app

https://console.firebase.google.com/u/0/project/music-app-e50df/hosting/sites/music-app-e50df

### • Domains

https://music-app-e50df.web.app

https://music-app-e50df.firebaseapp.com

✔ Created service account github-action-745356239 with Firebase Hosting admin permissions.

✔ Uploaded service account JSON to GitHub as secret FIREBASE_SERVICE_ACCOUNT_MUSIC_APP_E50DF.

i You can manage your secrets at https://github.com/ylli2000/minecraft-jukebox/settings/secrets.

### • Run emulators

`firebase emulators:start`

### • Deploy

`firebase deploy --only hosting`

### • Deploy Preview Channel

`firebase hosting:channel:deploy preview1 --expires 7d`

where preview1 is the id of the channel. You can list all the preview channels with:

`firebase hosting:channel:list`

│ preview1

│ Last Release Time

│ https://music-app-e50df--preview1-u7kmr9tq.web.app

│ Expire Time ...

To delete it, you can run:

`firebase hosting:channel:delete preview1`
