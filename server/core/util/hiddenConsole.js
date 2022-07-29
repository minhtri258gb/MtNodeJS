// let powershell = function() {

// 	let powershellScript = `
// 	Add-Type -Name Window -Namespace Console -MemberDefinition '
// 	[DllImport("Kernel32.dll")]
// 	public static extern IntPtr GetConsoleWindow();

// 	[DllImport("user32.dll")]
// 	public static extern bool ShowWindow(IntPtr hWnd, Int32 nCmdShow);
// 	'

// 	$consolePtr = [Console.Window]::GetConsoleWindow()
// 	#0 hide
// 	[Console.Window]::ShowWindow($consolePtr, 0)
// 	`;

// 	let workingDir = process.cwd();
// 	let tempfile = `${workingDir}\\temp.ps1`;
// 	mt.lib.fs.writeFileSync(tempfile, powershellScript);

// 	//a little convoluted to get around powershell script execution policy (might be disabled)
// 	require('child_process').execSync(`type .\\temp.ps1 | powershell.exe -noprofile -`, {stdio: 'inherit'});
// 	mt.lib.fs.unlinkSync(tempfile); //delete temp file
// }

let mtTools = function(toogle) {
	require('child_process').spawnSync('./server/tools/HiddenConsole/hidden.exe', [toogle ? 1 : 0], {stdio: 'inherit'});
}

module.exports = mtTools;
