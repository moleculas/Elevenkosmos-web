exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html' || stage === 'develop-html') {
    actions.setWebpackConfig({      
      resolve: {
        fallback: {
          "url": require.resolve("url/")
        },
      },
      module: {
        rules: [
          {
            test: /naughty-module/,
            use: loaders.null(),
          },
        ],
      },      
    });
  }
};