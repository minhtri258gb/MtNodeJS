import * as process from 'child_process';

let hiddenConsole = function(toogle) {
	process.spawnSync('./tools/HiddenConsole/hidden.exe', [toogle ? 1 : 0], {stdio: 'inherit'});
}
export default hiddenConsole;
