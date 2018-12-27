Install node.js and npm in your server/machine.

Once you have cloned this repository to DIR.

cd DIR
npm install
cd DIR/ngfrontend
npm install

The frontend subfolder contains the angular frontend service. You can theorotically run front end and backend in 
different server.

issue command

cd ..
npm install foreever

The above command runs the foreever utility, which restarts node server on crashes.

forever start ./bin/www 
cd ngfrontend
forever start node_modules/@angular/cli/bin/ng serve --host 172.31.14.99 —aot


The above 2 commands starts the backend and frontend.

To list the processes

forever list