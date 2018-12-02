const assert = require('assert');
const badgets = require('../badgets.js');
const fs = require('fs')

describe('badgets', () => {
  it('outdated', () => {
    const OUTDATED = fs.readFileSync(__dirname + '/outdated.json',{encoding:'utf8'})
    const output = badgets.parseOutdated(OUTDATED);
    assert.equal(output.total,17);
  });

  it('audit', () => {
    const AUDIT = fs.readFileSync(__dirname + '/audit.json',{encoding:'utf8'})
    const output = badgets.parseAudit(AUDIT);
    assert.equal(output.total,51);
  });

  it("svg", () => {
    return Promise.all([
      badgets.outdatedBadge(7, 'tmp/outdated-yellow.svg'),
      badgets.outdatedBadge(0, 'tmp/outdated-green.svg'),
      badgets.vulnerabilitiesBadge(2, 'tmp/vulnerabilities-red.svg'),
      badgets.vulnerabilitiesBadge(0, 'tmp/vulnerabilities-green.svg')
    ])

  })

});
