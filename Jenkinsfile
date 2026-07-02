pipeline {
    agent any

    environment {
        FRONTEND_IMAGE = "mayanksh786/hospital-frontend"
        BACKEND_IMAGE  = "mayanksh786/hospital-backend"
        TAG = "latest"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend Image') {
            steps {
                sh "docker build -t ${BACKEND_IMAGE}:${TAG} ./backend"
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh "docker build -t ${FRONTEND_IMAGE}:${TAG} ./frontend"
            }
        }

        stage('Docker Hub Login') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {
                    sh '''
                    echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                    '''
                }
            }
        }

        stage('Push Images') {
            steps {
                sh "docker push ${BACKEND_IMAGE}:${TAG}"
                sh "docker push ${FRONTEND_IMAGE}:${TAG}"
            }
        }
    }

    post {
        always {
            sh "docker logout || true"
        }

        success {
            echo "Pipeline completed successfully!"
        }

        failure {
            echo "Pipeline failed!"
        }
    }
}