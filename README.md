# Foody Mobile Order Application

## Deployment instructions

1. Install MySQL and MySQL Workbench for the user operating system from https://dev.mysql.com/downloads/

2. Install Node.js from https://nodejs.org/en/ 

3. Make a new directory:

        $ mkdir foody
        $ cd foody

4. Clone the repository:

        $ git clone https://github.com/justinh9408/MobileOrder.git

5. Install some packages for Ionic:

        $ npm install -g @ionic/cli native-run cordova-res
        $ npm install @ionic/pwa-elements

6. Open all the database update files (including dbupdate.txt, dbupdate_20200321.txt, dbupdate_20200402.txt, and dbupdate_20200407.txt) in FoodyBackend folder and copy the contents.

    Open MySQL and create a new SQL Query, phase the contents to the Query and execute it.

7. Create a file named DBConfig.js in FoodyBackend/db folder, which contains local MySQL info:

        module.exports =
        { 
            host: '127.0.0.1',     
            user: 'root',   
            password: '',  
            database:'rst',
            port: 3306  
        };

8. Install all the packages needed and then run the serve for frontend:
    
        $ cd FoodyFrontend
        $ npm install
        $ ionic serve

9. Open another terminal to install all the packages needed and run the serve for backend:

        $ cd FoodyBackend
        $ npm install
        $ npm test

10. Point your browser to the address http://localhost:8100.


