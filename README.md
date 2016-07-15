# feed
A single feed with multiple APIs for a single user [WIP]. Sorting entries by timestamp.

# usage
```bash
$ git clone [this repo]
```

# UI
```bash
# The general list we're aiming for
[XXXX-XX-XX] <verb> <object> on <repo-or-equivalent>
...
```

# test
```bash
$ npm test
```

# todos
- stream from fs
- async parallell all the APIs
- ~~normalize ts for each api~~
- ~~anchors in items~~ ~~codepen~~ ~~github~~
- ~~randomize something~~
- make actual requests to APIs
- more events for github - PR?
- ~~async or pipe for multiple api fetching~~
- make pype a module
- display on letter at a time - like a ticker
- let a user input username?
- add unix pager to ul
- ~~namespace middleware storage~~
- error handling for http and helpers
- use Etag for api:s that support them
- ~~try so api~~
- add more test

# LICENCE
MIT
