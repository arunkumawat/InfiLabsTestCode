## InfiLabsTestCode

### Pre Requiestics -
    -  
    -  
    -  
    -  
    -  

#### Step 1
create new angular cli project using command-  **ng new InfiLabsTestCode**


#### Step 2
Move to folder **InfiLabsTestCode** - **cd InfiLabsTestCode**


#### Step 3
install dependent modules which is used in this application. we need - 

	-  bootstrap (v4)
	-  ngx-bootstrap
	-  ngx-pagination
	-  font-awesome
    
install seperate using npm install command,
Or all at once using following command -  **npm install bootstrap ngx-bootstrap ngx-pagination font-awesome --save**


#### Step 4
update angular.json with bootstrap.min.css and font-awesome.css like - 

	"architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
			"styles": [
				"node_modules/bootstrap/dist/css/bootstrap.min.css",
				"src/styles.css",
				"node_modules/font-awesome/css/font-awesome.css"
			]
			...
			...
			...



