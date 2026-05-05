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
                git branch: 'main-develope', url: 'https://github.com/vinhkim1409/A-retail-management-systemNew'
            }
        }

        stage('Build Images') {
            steps {
                sh """
                docker-compose -f docker-compose.build.yml build
                """
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: DOCKERHUB_CREDENTIALS,
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh """
                    echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                    """
                }
            }
        }

        stage('Push Images') {
            steps {
                sh """
                docker-compose -f docker-compose.build.yml push
                """
            }
        }

        stage('Deploy to Production (Zero Downtime)') {
            steps {
                sshagent(credentials: [SSH_CREDENTIALS]) {
                    sh """
                    ssh -o StrictHostKeyChecking=no \
                        -o ServerAliveInterval=60 \
                        -o ServerAliveCountMax=3 \
                        ${SERVER_USER}@${SERVER_IP} << 'EOF'

                    set -e

                    cd ${DEPLOY_PATH}

                    echo "Pull latest images..."
                    docker-compose -f docker-compose.pro.yml pull

                    echo "Recreate containers without full downtime..."
                    docker-compose -f docker-compose.pro.yml up -d --remove-orphans

                    echo "Health check..."
                    curl -f http://localhost || exit 1

                    echo "Deploy successful"
EOF
                    """
                }
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

        always {
            sh """
            docker image prune -f
            """
        }
    }
}