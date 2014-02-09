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
    Success! https://github.com/settings/applications

This token is stored in `/path/to/gistjs/.token` and used for all future gisting. If you need to you can revoke it from https://github.com/settings/applications, or just delete the file.

After you've done this, you can still upload gists anonymously with -a.

    $ gistjs -a a.rb


## forked from / based on
Thanks for [defunkt/gist](https://github.com/defunkt/gist) <3
