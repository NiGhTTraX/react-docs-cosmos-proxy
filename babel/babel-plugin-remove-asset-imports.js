const STATIC_ASSET = /\.less|css|svg$/;


/**
 * Remove any imports of static assets.
 */
module.exports = babel => {
  const { types: t } = babel;

  return {
    visitor: {
      ImportDeclaration(path) {
        if (STATIC_ASSET.test(path.node.source.value)) {
          // Remove side effect imports.
          if (!path.node.specifiers.length) {
            path.remove();
          } else {
            // Turn regular imports into variable assignments with an empty string
            // as the value.
            path.replaceWith(t.variableDeclaration(
              'let',
              path.node.specifiers.map(specifier => t.variableDeclarator(
                t.identifier(specifier.local.name),
                t.stringLiteral('')
              ))
            ));
          }
        }
      }
    }
  };
};
