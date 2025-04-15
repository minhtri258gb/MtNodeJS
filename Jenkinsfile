pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
                git 'https://github.com/minhtri258gb/MtNodeJS.git'
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