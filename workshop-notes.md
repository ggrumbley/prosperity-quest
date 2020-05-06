# Prosperity Quest Workshop

## Steps to add TS

1. `yarn add -D typescript @babel/preset-typescript`
2. Add TS preset to babel config `"@babel/typescript"`
3. `tsc --init`
4. -- Demo some of the keypoints of the TSConfig
5. Then paste in our actual options

```json
{
  "compilerOptions": {
    "noEmit": true,
    "strict": true,
    "jsx": "react",
    "target": "esnext",
    "module": "esnext",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "removeComments": true,
    "rootDir": "./src",
    "outDir": "./dist",
  }
}
```

6. Demo that nothing has changed in our project, change file extensions.
7. Update file extensions in node scripts `"dev:server": "nodemon --exec babel-node --extensions '.ts,.js' src/server/index.ts",`
8. Notice there is a lack of types for the node libraries. We can add them with `yarn add -D @types/node @types/socket.io @types/express`
9. Lets refactor out the socket.io listeners.
