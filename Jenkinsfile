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
                docker compose -f docker-compose.build.yml build server
                docker compose -f docker-compose.build.yml build client
                docker images
                """
            }
        }
        stage('Login Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: DOCKERHUB_CREDENTIALS,
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
             )]) {
                sh """
                echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                """
                }
        }
    }
    stage('Push Images') {
            steps {
                sh """
                docker compose -f docker-compose.build.yml push
                """
            }
        }
    stage('Deploy') {
            steps {
                withCredentials([
                    sshUserPrivateKey(
                        credentialsId: 'ec2-ssh-key',
                        keyFileVariable: 'SSH_KEY',
                        usernameVariable: 'SSH_USER'
                    )
                ]) {
                    sh '''
                    ssh -i \$SSH_KEY \
                        -o StrictHostKeyChecking=no \
                        \$SSH_USER@${SERVER_IP} << 'EOF'

                    set -e

                    # ===== CONFIG =====
                    CLIENT_IMAGE="kimxuanvinh2002/retailclient:latest"
                    SERVER_IMAGE="kimxuanvinh2002/retailserver:latest"

                    CLIENT_CONTAINER="frontend"
                    SERVER_CONTAINER="backend"

                    SERVER_PORT=5000
                    CLIENT_PORT=80

                    # ===== PULL IMAGE =====
                    docker pull \$CLIENT_IMAGE
                    docker pull \$SERVER_IMAGE

                    # ===== STOP & REMOVE OLD CONTAINERS =====
                    docker stop \$CLIENT_CONTAINER || true
                    docker rm \$CLIENT_CONTAINER || true

                    docker stop \$SERVER_CONTAINER || true
                    docker rm \$SERVER_CONTAINER || true

                    # ===== RUN SERVER =====
                    docker run -d \
                        --name \$SERVER_CONTAINER \
                        -p \$SERVER_PORT:5000 \
                        --restart unless-stopped \
                        \$SERVER_IMAGE

                    # ===== RUN CLIENT =====
                    docker run -d \
                        --name \$CLIENT_CONTAINER \
                        -p \$CLIENT_PORT:80 \
                        --restart unless-stopped \
                        \$CLIENT_IMAGE

                    sleep 10

                    echo "Deploy OK (client + server)"

EOF
                    '''
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
    }
}