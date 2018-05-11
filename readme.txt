Used below steps to push this project on cloud9 to git-hub:

Open your project : https://ide.c9.io/username/project 
now, on the bash terminal, make this :

git init
git add .
git commit -m "first commit"

git remote add origin https://github.com/username/project.git 
git push -u origin master

git log

After changes:

git status

git add readme.txt   (This step places the new file readme.txt to the staging area)

git commit -m "Add a new readme.txt from cloud9 staging Area"

git pull    (This integrate all the remote changes before pushing to the "GitHub" Repository)

git push -u origin master


For example below is what I did to commit the latest code changes related to refactoring app.js, to GitHub Repository:

git status

git add app.js       (This will place the modified app.js into the staging area)
git add seeds.js     (This will place the modified seeds.js into the staging area)

git status

git commit -m "Refactor the app.js"   (This step will finally commit those changes to Git Repository i.e.   .git/

git status

git add routes   (This will place the new (thus modified) directory routes into the staging area)

git commit -m "Refactor the app.js"    

git pull   (This integrate all the remote changes before pushing to the "GitHub" Repository)

(So basically, before this step, our local Git Repository .git/ and the remote Git Repository (GitHub) are not matched, 
and in this case, our local master branch is "ahead of 'origin/master' branch (on GitHub Repository) by 2 commits" (i.e. one commit for changes made to app.js and seeds.js
and the other commit for changes made to all files in new directory routes)

git push -u origin master 