pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = 'eab82e01-fee7-403e-86a7-a63b68ba9310'
        SSH_CREDENTIALS = 'ec2-ssh-key'

        DOCKER_IMAGE_CLIENT = "kimxuanvinh2002/retailclient"
        DOCKER_IMAGE_SERVER = "kimxuanvinh2002/retailserver"

        SERVER_IP = '3.26.94.35'
        SERVER_USER = 'ubuntu'
        DEPLOY_PATH = '/home/ubuntu/app'

        VERSION = "${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main-deploy', url: 'https://github.com/vinhkim1409/A-retail-management-systemNew'
            }
        }

        stage('Build Images') {
            steps {
                sh """
                docker compose -f docker-compose.build.yml build
                """
            }
        }
    }

    post {

        success {
            echo "✅ Deploy SUCCESS"
        }

        failure {
            echo "❌ Deploy FAILED - check logs"
        }
    }
}