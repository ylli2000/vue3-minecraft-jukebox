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

### • CICD

`firebase init hosting:github`

? Set up the workflow to run a build script before every deploy? Yes

? What script should be run before every deploy? pnpm i && pnpm build

put the following in the workflow file to enable `pnpm`:

```
steps:
    - uses: actions/checkout@v4
    - uses: pnpm/action-setup@v2
    with:
        version: 8
    - run: pnpm i && pnpm build
    ...
```

Don't forget to also go to Github:

`Actions -> General -> Workflow permissions`

enable `Read and Write permissions` and Allow Github Actions to create and approbve PRs. and SAVE.

Now, you can create a new branch, and PR to `master` and see the workflow in action on GitHub page.
