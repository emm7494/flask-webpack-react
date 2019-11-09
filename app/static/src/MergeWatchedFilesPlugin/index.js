class MergeWatchedFilesPlugin {
  constructor(options) {
    this.options = options || {
      contextDependencies: null,
      fileDependencies: null
    };
  }
  apply(compiler) {
    compiler.hooks.done.tap("Merge Watched Files Plugin", (stats) => {
      console.log(`${Object.entries(stats).join("\n")}`);
      // callback();
    });
  }
}

module.exports = MergeWatchedFilesPlugin;
