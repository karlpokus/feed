# feed
A single feed with multiple APIs for a single user [WIP]. Sorting entries by timestamp.

# usage
```
$ git clone [this repo]
```

# UI
```
# What I'm aiming for
$ tail <something> -u <userName> [linked list of api:s]
[XXXX-XX-XX] <verb> <object> on <repo>
...
```

# todos
- stream from fs
- ~~normalize ts for each api~~
- ~~anchors in items~~ ~~codepen~~ ~~github~~
- ~~randomize something~~
- make actual requests to api:s
- more events for github
- remove username from repo?
- ~~async or pipe for multiple api fetching~~
- make pype a module
- display on letter at a time - like a ticker
- let a user input username?
- add unix pager to ul
- namespace middleware storage and new props on single items
- error handling for http and helpers
- use Etag for api:s that support them
- try more api:s
- add test

# LICENCE
MIT
