# Prog2
oop &amp; others


# Pacakge & command to bundle all files into a single dist file - for use in ChatGPT or other LLMs.
```npm install esbuild --save-dev```
```npx esbuild index.js --bundle --platform=node --outfile=dist/app.js --external:./node_modules/*```
