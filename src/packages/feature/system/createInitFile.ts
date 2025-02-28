import { InitFileItem } from '@/packages/type/type';
import { System } from '.';
import { join } from '../core/Path';

export const createInitFile = async (system: System, file: InitFileItem, path = '') => {
  const fs = system.fs;
  if (file.type === 'file') {
    if (file.content) {
      await fs.writeFile(join(path, file.name), {
        content: file.content,
      });
    }
  } else if (file.type === 'dir') {
    const tempPath = join(path, file.name);
    await fs.mkdir(tempPath);

    if (file.children?.length) {
      for (let i = 0; i < file.children.length; i++) {
        await createInitFile(system, file.children[i], tempPath);
      }
    }
  }
};
