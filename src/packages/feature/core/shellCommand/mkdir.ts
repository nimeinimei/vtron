import type { Shell } from '../Shell';
import * as vPath from '../Path';
async function mkdir(input: string, output: (text: string) => void, shell: Shell) {
  const fileName = input.split(' ')[1].trim();
  const res = await shell.system.fs.stat(vPath.join(shell.router, fileName));
  if (res) {
    output(`\x1b[31m${fileName}: Directory exists\x1b[0m\r\n`);
  } else {
    await shell.system.fs.mkdir(vPath.join(shell.router, fileName));
  }
}
export { mkdir };
