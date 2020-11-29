# Trello clone Project with dynamic theme

### What is project's stack?
 #### Core Stack 
 - <a href="https://github.com/facebook/react">Reactjs</a>
 - <a href="https://github.com/microsoft/TypeScript">Typescript</a>
 - <a href="https://redux-toolkit.js.org/introduction/quick-start">Redux implement by Redux toolkit</a>
 
 #### Framework UI
 - <a href="https://ant.design/docs/react/introduce">Ant Design</a>
 - Less style
 
 #### HTTP request
 - <a href="https://github.com/axios/axios">Axios</a>
 
 #### Coding styling format
 - <a href="https://github.com/prettier/prettier">Prettier</a>
 
 #### Docker
 - Will be soon implement 
 

### How to modify theme ant design with less loader
**install less loader global**

`npm install less -g`

**dark theme**

`lessc --js src/theme/dark-theme.less public/dark-theme.css`

**light theme**

`lessc --js src/theme/light-theme.less public/light-theme.css`

### How to run this project
`cd {project-path} && yarn && yarn start`

