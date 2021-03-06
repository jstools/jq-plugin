
require('nitro')(function (nitro) {

  nitro.task('build', function () {

    nitro.load('jq-plugin.js')
      .process('uglify')
      .writeFile('jq-plugin.min.js');

  });

  // pkg addons

  var pkgActions = {
    increaseVersion: function () {
      nitro.package('bower').setVersion( nitro.package('npm').increaseVersion().version() );
    }
  };

  nitro.task('pkg', function (target) {
    if( pkgActions[target] ) {
      return pkgActions[target]();
    }

    var pkg = require('./package');
    process.stdout.write(pkg[target]);
    process.exit(0);
  });

  nitro.task('demo', function (target) {

    nitro.server({
      root: 'demo',
      dirAlias: {
        lib: '.'
      },
      openInBrowser: true
    });

  });

}).run();
