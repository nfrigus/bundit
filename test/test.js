const
  bundit = require('..'),
  chai = require('chai'),
  fs = require('fs-promise');

chai.use(require('chai-fs'));


describe('bundit', () => {

  before(clearDist);
  after(clearDist);

  describe('js packer', () => {
    let
      src = './test/resources/src.rc.js',
      dest = './dist/bundle.js';

    before(() => new Promise(resolve => bundit
      .packJs(src, dest)()
      .on('end', resolve)
    ));

    it('should compile js into dist folder', () => chai.expect(dest).to.be.a.file().and.not.empty);
    it('should generate sourcemaps', () => chai.expect(dest + '.map').to.be.a.file().and.not.empty);
  });


  describe('less packer', () => {
    let
      src = './test/resources/src.rc.less',
      destfile = './dist/bundle.css',
      destdir = './dist';

    before(() => new Promise(resolve => bundit
      .packLess(src, destfile)()
      .on('end', resolve))
    );

    before(() => new Promise(resolve => bundit
      .packLess(src, destdir)()
      .on('end', resolve))
    );

    it('should compile less into dist folder', () => chai.expect(destfile).to.be.a.file().and.not.empty);
    it('should generate sourcemaps', () => chai.expect(destfile + '.map').to.be.a.file().and.not.empty);
    it('should compile src name if only dist folder provided', () =>
      chai.expect(destdir + '/src.rc.css').to.be.a.file().and.not.empty
      &&
      chai.expect(destdir + '/src.rc.css.map').to.be.a.file().and.not.empty
    );
  });

  function clearDist() {
    return fs.remove('./dist');
  }
});
