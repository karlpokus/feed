# feed
A single feed with multiple APIs for a single user [WIP]. Sorting entries by timestamp.

# usage
```bash
$ git clone [repo]
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
- [x] async parallell all the APIs - see `node-apps/aync-parallel-test` (sic)
- [x] normalize ts for each api~~
- [x] anchors in items
- [x] make pype a module
- [ ] so token
- [ ] npm module
- [ ] send basic html and poll to `/feed` for initial data and updates
- [x] namespace middleware storage
- [ ] use cache and Etag for api:s that support them

# LICENCE
MIT
