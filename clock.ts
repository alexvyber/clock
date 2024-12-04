import { exec as execChildProcess } from "node:child_process";
import { DateTime, Duration } from "luxon";
import { promisify } from 'node:util';
const exec = promisify(execChildProcess);

const { stdout, stderr } = await exec('git branch');

if(stderr) throw new Error(stderr)

console.log()
const branch = stdout.split("\n").find(s => s.startsWith("* "))?.replaceAll("* ", "")


const start = DateTime.now();
const label = branch ?? process.argv[2];





setInterval(() => {
	console.clear();
	const millis = DateTime.now().toMillis() - start.toMillis();
	console.log(`${label}:`, Duration.fromMillis(millis).toFormat("hh:mm:ss"));
}, 1000);
