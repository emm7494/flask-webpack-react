class MergeWatchedFilesPlugin {
  constructor(options) {
    this.options = options || {
      contextDependencies: null,
      fileDependencies: null
    };
  }
  apply(compiler) {
    compiler.hooks.afterCompile.tap(
      "Merge Watched Files Plugin",
      (compilation) => {
        // for (let key of Object.keys(compilation)) {
        //   console.log(compilation[key]);
        // }
        console.log(compilation);
        // callback();
      }
    );
  }
}

module.exports = MergeWatchedFilesPlugin;
