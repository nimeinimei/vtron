import { VtronFile } from '@feature/core/fileSystem';
import { System } from '@feature/system';
import * as FsPath from '@feature/core/Path';
import { emitEvent } from '@feature/event';
export function useFileDrag(system: System) {
  function startDrag(ev: DragEvent, item: VtronFile) {
    ev?.dataTransfer?.setData('fromobj', 'web');
    ev?.dataTransfer?.setData('frompath', item.path);
  }
  // 拖到文件放下时
  async function folderDrop(ev: DragEvent, toPath: string) {
    const frompath = ev?.dataTransfer?.getData('frompath');
    if (!frompath) return;
    if (frompath == toPath) {
      return;
    }
    if (frompath === FsPath.join(toPath, FsPath.basename(frompath))) {
      return;
    }
    const toFile = await system?.fs.stat(toPath);
    if (toFile?.isDirectory) {
      system?.fs.rename(frompath, FsPath.join(toPath, FsPath.basename(frompath))).then(() => {
        emitEvent('file.props.edit');
      });
    }
  }
  async function writeFileToInner(
    path: string,
    name?: string,
    content?: string,
    process?: (path: string) => void
  ) {
    system?.fs
      .writeFile(FsPath.join(path, name || 'unkown'), {
        content: content || '',
      })
      .then(() => {
        process?.(FsPath.join(path, name || 'unkown'));
      });
  }
  // 外部文件拖到文件夹放下时
  async function outerFileDrop(path: string, list: FileList | undefined, process: (path: string) => void) {
    const len = list?.length || 0;
    for (let i = 0; i < len; i++) {
      const item = list?.[i];

      // let oFile = null;
      const reader = new FileReader();
      //读取成功
      reader.onload = function () {
        // console.log(reader);
      };
      reader.onloadstart = function () {
        // console.log('读取开始');
      };
      reader.onloadend = function () {
        if (
          item?.type == 'image/jpeg' ||
          item?.type == 'image/png' ||
          item?.type == 'image/gif' ||
          item?.type == 'image/bmp' ||
          item?.type == 'image/webp'
        ) {
          writeFileToInner(path, item?.name, reader.result as string, process);
        } else if (item?.type == 'audio/mpeg') {
          writeFileToInner(path, item?.name, reader.result as string, process);
        } else if (item?.type == 'video/mp4') {
          writeFileToInner(path, item?.name, reader.result as string, process);
        } else if (item?.type == 'text/plain') {
          writeFileToInner(
            path,
            item?.name,
            decodeURIComponent(escape(atob((reader.result?.toString() || '').split(',')[1]))),
            process
          );
        } else {
          writeFileToInner(path, item?.name, reader.result as string, process);
        }
      };
      reader.onabort = function () {
        // console.log('中断');
      };
      reader.onerror = function () {
        // console.log('读取失败');
      };
      reader.onprogress = function (ev) {
        const scale = ev.loaded / ev.total;
        if (scale >= 0.5) {
          reader.abort();
        }
      };
      reader.readAsDataURL(new Blob([item as BlobPart]));
    }
  }
  async function refFileDrop(ev: DragEvent, path: string) {
    ev.preventDefault();
    const fromobj = ev?.dataTransfer?.getData('fromobj');
    if (fromobj == 'web') {
      folderDrop(ev, path);
    } else {
      const oFileList = ev?.dataTransfer?.files;
      if (system.outerFileDropCallback) {
        system.outerFileDropCallback?.(path, oFileList, () => {
          emitEvent('file.props.edit');
        });
      } else {
        outerFileDrop(path, oFileList, () => {
          emitEvent('file.props.edit');
        });
      }
    }
  }
  return {
    startDrag,
    folderDrop,
    outerFileDrop,
    refFileDrop,
  };
}
