# Lockfile

A small lockfile utility.

Any other instances trying to acquire the lock will fail
until the lock has been released.

## Install

> This is an __alpha veraion__. Input is appreciated!

```
npm i @art-of-coding/lockfile
```

## Example

```ts
import acquireLock from '@art-of-coding/lockfile'

// Acquire the lock
const release = await acquireLock('path/to/some/file.txt')

// do some work...

// and then release the lock
await release()
```

## License

Copyright 2021 Michiel van der Velde.

This software is licensed under [the MIT License](LICENSE).
