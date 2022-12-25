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
                sh "sudo docker-compose down"
                sh "sudo docker-compose up -d --build"
                sh "sudo docker ps"
            }
        }
    }
}