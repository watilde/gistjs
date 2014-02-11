# gistjs

node.js meet the gist

## Install

Using npm.

    $ npm install -g gistjs

## Command
To upload the contents of `a.js` just:

    $ gistjs a.js

Upload multiple files:

    $ gistjs a b c
    $ gistjs *.js

Use -p to make the gist private:

    $ gistjs -p a.js

Use -d to add a description:

    $ gistjs -d "Hello World" a.js

## Login
If you want to associate your gists with your GitHub account, you need to login with gistjs. It doesn't store your username and password, it just uses them to get an OAuth2 token (with the "gist" permission).

    $ gistjs --login
    Obtaining OAuth2 access_token from github.
    GitHub username: watile
    GitHub password:
    2-factor auth code:
    Success! https://github.com/settings/applications

You can read the 2-factor auth code from an sms or the authentification app, depending on how you [set your account up](https://github.com/settings/admin).

Note: 2-factor authentication [just appeared recently](https://github.com/blog/1614-two-factor-authentication), so if you run into errors, update the gistjs npm.

```
npm update -g gistjs
```

This token is stored in `/path/to/gistjs/.token` and used for all future gisting. If you need to you can revoke it from https://github.com/settings/applications, or just delete the file.

After you've done this, you can still upload gists anonymously with -a.

    $ gistjs -a a.js

## Logout
Remove `/path/to/gistjs/.token`

    $ gistjs --logout

## Save other token
You can save token when you have already got token.

    $ gistjs --save other_token

## forked from / based on
Thanks for [defunkt/gist](https://github.com/defunkt/gist) <3
