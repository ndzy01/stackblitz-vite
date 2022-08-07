import fs from 'fs';
import path from 'path';

const docsRoot = path.join(__dirname, '../docs');
const ignoreDirList = ['code'];
const readFileList = (
  dir = docsRoot,
  filesList: { name: string; path: string }[] = [],
  dirList: string[] = [],
  dirName = '',
) => {
  const files = fs.readdirSync(dir);

  files.forEach((item) => {
    const filePath = path.join(dir, item);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory() && !ignoreDirList.includes(item)) {
      readFileList(path.join(dir, item), filesList, dirList, item);
      dirList.push(item);
    } else {
      const fileNameArr = path.basename(filePath).split('.');
      const type = fileNameArr[1];
      const path_ = filePath.slice(filePath.lastIndexOf('/docs'));

      if (type === 'md') {
        filesList.push({ name: dirName, path: path_ });
      }
    }
  });

  return { filesList, dirList };
};
export const fun = () => {
  const { filesList, dirList } = readFileList();
  const nav: { text: string; children: string[] }[] = [];

  dirList.map((d) => {
    const obj = { text: d, children: [] };

    nav.push(obj);

    return d;
  });

  filesList.map((f) => {
    nav.map((n) => {
      if (n.text === f.name) {
        n.children.push(f.path);
      }

      return n;
    });

    return f;
  });

  return { nav: nav.reverse() };
};
