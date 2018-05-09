Used below steps to push this project on cloud9 to git-hub:

Open your project : https://ide.c9.io/username/project 
now, on the bash terminal, make this :

git init
git add .
git commit -m "first commit"

git remote add origin https://github.com/username/project.git 
git push -u origin master


After changes:

git status

git add readme.txt   (This step places the new file readme.txt to the staging area)

git commit -m "Add a new readme.txt from cloud9 staging Area"