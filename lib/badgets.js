const badgen = require('badgen')
const fs = require('fs')
const { execSync } = require('child_process');

const flows = {
    /**
     * 
     * @param {path} dir 
     */
    outdated(dir) {
      return command('npm outdated --json')
        .then(stdout => 
          outdatedBadge(
            parseOutdated(stdout).total,
            dir + '/outdated.svg'
          )
        ).then(() => {
          console.info("outdated badge created")
        })
    },
    /**
     * 
     * @param {path} dir 
     */
    vulnerabilities(dir) {
      return command('npm audit --json')
        .then(stdout => 
          vulnerabilitiesBadge(
            parseAudit(stdout).total,
            dir + '/vulnerabilities.svg')
        ).then(() => {
          console.info("audit badge created")
        })
    }
  }
  
  
  /**
   * 
   * @param {Argv} argv 
   */
  function doit(argv) {
    const options = ["outdated","vulnerabilities"];
    const dir = argv.dir
    const count = options.reduce((agg,opt) => argv[opt] ? agg+1 : agg,0)
    if (count=== 0) {
      options.forEach((opt) => argv[opt] = true)
    }
  
    const work = options
      .filter(opt => argv[opt] === true)
      .map(opt => flows[opt])
      .reduce((queue, task) => { 
        console.log("queueing", task.name)
        return (queue === null) ?
          task(dir) : queue.then(() => task(dir) )
      }, null)
    work.then(() => {
      console.log("done")
    })
    .catch(e => {
      console.error(e);
      process.exit(1)
    })
  }
  /*
  function command_(str) {
    console.log(str)
    
    return new Promise((resolve,reject) => {
      exec(str,(err, stdout, stderr) => {
        //console.log("output",stdout)
        if (!err) {
          resolve(stdout)
        }
        else {
          console.error("error while running " +str ,stderr)
          reject(err)
        }
      })
    })
  }*/
  
  /**
   * 
   * @param {*} str 
   */
  function command(str) {
    return new Promise((resolve) => {
      console.log(str)
      let output;
      try {
        output = execSync(str)
      } catch (e) {
        output = e.stdout
      }
      resolve(output)
    })
  }
  
  
  /**
   * 
   * @param {string} outdatedOutput json string of npm outdated report
   */
  function parseOutdated(outdatedOutput) {
    // eslint-disable-next-line
    // console.log(text)
    if (outdatedOutput.length === 0) {
      return {total:0}
    }
    const data = JSON.parse(outdatedOutput)
    const total = Object.keys(data).length
    return {total};
  }
  
  /**
   * 
   * @param {*} auditOutput json string of auditOutput 
   */
  function parseAudit(text) {
    const data = JSON.parse(text)
    const {vulnerabilities } = data.metadata
    const total = Object.keys(vulnerabilities).reduce((sum,k) => sum + vulnerabilities[k],0);
    vulnerabilities.total = total;
    return vulnerabilities
  }
  
  
  function outdatedBadge(count, path) {
    console.log("outdatedBadge path",path)
    return createBadge({
      subject: 'outdated',
      status: ''+count,
      color: count === 0 ? 'green':'yellow', 
      style: 'classic', 
    },path)
  }
  
  function vulnerabilitiesBadge(count, path) {
    console.log("vulnerabilitiesBadge path",path)
    return createBadge({
      subject: 'vulnerabilties',   // <Text>
      status: ''+count, // <Text>
      color: count === 0 ? 'green':'red',    // <Color RGB> or <Color Name>, optional
      style: 'classic',    // 'flat' or undefined, optional
    },path)
  }
  
  function createBadge(data,path) {
    console.log("createBadge path",path)
    return new Promise((resolve,reject) => {
      const svgString = badgen(data)
      fs.writeFile(path, svgString, err => err ? reject(err): resolve(svgString)); 
    })
  }
  
  module.exports = {
    doit,
    parseOutdated,
    parseAudit,
    outdatedBadge,
    vulnerabilitiesBadge
  }