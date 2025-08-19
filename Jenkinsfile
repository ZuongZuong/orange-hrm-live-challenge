pipeline {
    agent any

    tools {
        nodejs 'NodeJS-20'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Install Browsers') {
            steps {
                bat 'npx playwright install ${params.BROWSER}'
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    if (params.TEST_TAG?.trim()) {
                        echo "Running only tests with tag: ${params.TEST_TAG}"
                        bat "npx playwright test --grep \"@${params.TEST_TAG}\" --reporter=line,html,allure-playwright"
                    } else {
                        echo "No tag provided. Running ALL tests."
                        bat "npx playwright test --reporter=line,html,allure-playwright"
                    }
                }
            }
        }

        stage('Clean Old Allure Report') {
            steps {
                bat 'rmdir /s /q allure-report || echo "No previous report"'
                bat 'rmdir /s /q allure-results || echo "No previous results"'
             }
        }


        stage('Publish Allure Report') {
            steps {
                allure([
                    includeProperties: false,
                    jdk: 'JDK-17',
                    results: [[path: 'allure-results']]
                ])
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
            archiveArtifacts artifacts: 'allure-results/**', allowEmptyArchive: true
        }
    }
}
