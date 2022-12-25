pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
                git 'https://github.com/thanghuy/web-deploy.git'
            }
        }
        stage('Build') {
            steps {
                bat 'npm install'
                bat "npm run build"
            }
        }
        stage('Deploy') {
            steps {
                bat 'del -rf /var/www/html'
                bat "cp -r ${WORKSPACE}/dist/ /var/www/html"
            }
        }
    }
}