## InfiLabsTestCode

### Pre Requiestics -
	I am uing following configuration - 
	 > npm -v	-	5.6.0
	 > ng --version
	Angular CLI: 6.0.3
	Node: 8.11.2
	OS: win32 x64
	Angular: 6.0.3
	... animations, cli, common, compiler, compiler-cli, core, forms
	... http, language-service, platform-browser
	... platform-browser-dynamic, router

	Package                           Version
	-----------------------------------------------------------
	@angular-devkit/architect         0.6.3
	@angular-devkit/build-angular     0.6.3
	@angular-devkit/build-optimizer   0.6.3
	@angular-devkit/core              0.6.3
	@angular-devkit/schematics        0.6.3
	@ngtools/webpack                  6.0.3
	@schematics/angular               0.6.3
	@schematics/update                0.6.3
	rxjs                              6.2.0
	typescript                        2.7.2
	webpack                           4.8.3
	

#### Step 1
create new angular cli project using command-  **ng new InfiLabsTestCode**


#### Step 2
Move to folder **InfiLabsTestCode** - **cd InfiLabsTestCode**


#### Step 3
install dependent modules which is used in this application. we need - 

	1  bootstrap (v4)	https://www.npmjs.com/package/bootstrap
	2  ngx-bootstrap	https://valor-software.com/ngx-bootstrap/#/
	3  ngx-pagination	https://www.npmjs.com/package/ngx-pagination
	4  font-awesome		https://www.npmjs.com/package/angular-font-awesome


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



