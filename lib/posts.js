import fs from "fs";
import path from "path";
import matter from "gray-matter";

// path.joinメソッドは引数をくっつけて引数１/引数2/引数3/...を作成する
// process.cwd()は現在のワーキングディレクトリを取得する。つまり、yarnを走らせるディレクトリになるから、このプロジェクトのルートディレクトリとなる
// postDirectoryは/postsになるけどなんで固定ではなく動的に取得するのだろう。。。
const postDirectory = path.join(process.cwd(), "posts");
// process.cwd()の動きがイマイチわかっていないから試す

// 最終的にファイルの中身を読み取っていない気がするのだが、どこで取っているのだろう？
// これはまだ取っていなかった
export const getSortedPostsData = () => {
  // get file names under /posts
  // 取得したファイル名は配列に格納される
  const fileNames = fs.readdirSync(postDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postDirectory, fileName);
    // fileContentsがfront matter含めたデータ
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    // front matterをパースする
    const matterResult = matter(fileContents);

    // Combine the data with the id
    // matterの返り値はcontent obj & data objで帰ってくる。dataがfront matter
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
};
