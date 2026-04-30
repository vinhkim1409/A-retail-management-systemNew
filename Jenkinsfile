pipeline {
    agent {
      label 'lab-server'
    }
    environment {
        COMPOSE_PROJECT_NAME = "retailmangagement"
    }
    stages {
        stage('Checkout') {
            steps {
                echo '=== Checkout Source ==='
                checkout scm
            }
        }
        stage('Show Info'){
            steps {
                sh '''
                echo "=== SYSTEM INFO==="
                whoami
                pwd
                docker --version
                docker-compose --version
                '''
            }   
        }

        stage('Build Images'){
            steps {
                echo '=== Build docker images==='
                sh 'docker-compose build'
            }
        }

        stage('Stop old containers'){
            steps {
                echo '=== Stop Old Containers ==='
                sh 'docker-compose down || true'
            }
        }

        stage('Run containers'){
            steps {
                echo '=== Start New Containers ==='
                sh 'docker-compose up -d'
            }
        }

        stage('Check Running'){
            steps{
                echo '=== Check Containers ==='
                sh 'docker ps'
            }
        }
    }
    post {
        success {
            echo '✅ Deploy SUCCESS'
        }
        failure {
            echo '❌ Deploy FAILED'
        }
    }
}
