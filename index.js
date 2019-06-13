const _ = require('lodash');
const shell = require('shelljs');

const main = () => {
  const cmd = "ps -A | grep '/Library/Application Support/Seqrite/Seqrite/' | sed 's/|/ /' | awk '{print $1, $8}'";
  const pids = shell.exec(cmd, { silent: true });
  const pidsToKill = pids.stdout.split(/\s+/).map(pid => _.toInteger(pid)).filter(pid => (pid>0 && pid<1000));
  _.each(pidsToKill, pid => {
    const response = shell.exec(`sudo kill -9 ${pid}`, { silent: true });
    if (response.code !== 0) {
      console.log(`Failed to kill Seqrite process with id : ${pid} :: err :`, response.stderr);
    }
  });
  console.log('Seqrite kill process finished');
};

main();
