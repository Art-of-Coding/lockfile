'use strict'

import { isAbsolute, resolve } from 'path'
import { writeFile, unlink } from 'fs/promises'
import { createHash } from 'crypto'

import mkdirp from 'mkdirp'

/**
 * Acquire a lock on a file.
 * Any other instances trying to acquire the lock
 * will fail until the lock is released.
 * @param path The path to acquire the lock for
 * @returns A function to release the lock
 */
export default async function acquireLock (path: string): Promise<() => Promise<void>> {
  path = isAbsolute(path) ? path : resolve(process.cwd(), path)

  const pathHash = createHash('sha2').update(path).digest('base64')
  const lockDir = resolve(__dirname, '../.locks')

  // Make sure the directory exists
  await mkdirp(lockDir)

  const lockPath = resolve(lockDir, `./${pathHash}.lock`)

  await writeFile(lockPath, `${process.pid}`, {
    flag: 'wx',
    encoding: 'utf-8'
  })

  return async function releeaseLock (): Promise<void> {
    await unlink(lockPath)
  }
}
