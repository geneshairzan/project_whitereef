cd /web/project_whitereef/html
git pull github master
npm i
npm run build
pm2 restart project_whitereef
