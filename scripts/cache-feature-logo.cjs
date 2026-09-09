const fs=require('fs');
const source=fs.readFileSync('C:/Users/Win10/Downloads/stitch_gmb_rank_tracker_website/code.html','utf8');
const header=source.match(/<header[\s\S]*?<\/header>/)[0];
const logo=header.match(/src="([^"]+)"/)[1];
(async()=>{const r=await fetch(logo,{signal:AbortSignal.timeout(30000)});if(!r.ok)throw Error(r.status);fs.writeFileSync('public/features-assets/header-logo.png',Buffer.from(await r.arrayBuffer()));console.log('Original header logo saved');})().catch(e=>{console.error(e.message);process.exitCode=1});
